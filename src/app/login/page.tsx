"use client"
import { useState } from 'react';
import Link from 'next/link';
import { checkForUniqueUsername } from '../actions';
import { checkPasswordHash } from '../actions';
import { login } from '../actions';

export default function Login(){
    const [errorMessage, setErrorMessage] = useState("");
    return(
        <>
        <form className="loginForm" action={handleSubmit} method="post">
            <label htmlFor="username">Username</label>
            <input type="text" autoComplete="off" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <div className="loginButtonWrapper">
            <button>Login<input type="submit" hidden /></button>
            </div>
            <p className='text-red-400'>{errorMessage}</p>
            <p>No account yet? <Link href="register" className='text-blue-300 hover:text-blue-500' >Register</Link></p>
        </form>
        </>
    )

    function handleSubmit(formData : FormData){
        const username = formData.get("username");
        const password = formData.get("password");
        
        if(!username || !password){
            setErrorMessage("Fill in the fields you dummy.")
        }
        else{
            (checkForUniqueUsername(formData))
            .then(promiseResult =>{
                if(promiseResult === null){
                    setErrorMessage("Username not found.")
                }
                else{
                    (checkPasswordHash(formData))
                    .then(promiseResult =>{
                        if(promiseResult === false){
                            setErrorMessage("Password didn't match.")
                        }
                        else{
                            setErrorMessage("Logging in...")
                            login(formData);
                        }
                    })
                }
            })
            .catch(error =>{
                setErrorMessage("Error finding username. Contact sys admin.");
            })

        }

    }
}