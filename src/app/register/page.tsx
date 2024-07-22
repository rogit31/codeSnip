"use client"
import { useState } from 'react';
import { registerUser } from '../actions';
import { checkForUniqueUsername } from '../actions';
import Link from 'next/link'
export default function Register(){
    const [errorMessage, setErrorMessage] = useState('');
    return (
        <>
            <form className="loginForm" action={onSubmit} method="post">
            <label htmlFor="username">Username</label>
            <input type="text" autoComplete="off" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="passwordCheck">Check password</label>
            <input type="password" name='passwordCheck' id='passwordCheck' />
            <label htmlFor="email">Email</label>
            <input type="text"  name='email' id='email'/>
            <div className="loginButtonWrapper">
            <button>Register<input type="submit" hidden /></button>
            </div>
            <p className='text-red-400'>{errorMessage}</p>
            <p>Already have an account? <Link href="login" className='text-blue-300 hover:text-blue-500' >Login</Link></p>
        </form>
        </>
    )

    async function onSubmit(formData:FormData){
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const passwordCheck = formData.get("passwordCheck") as string;
        const email = formData.get("email") as string;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
        if(!username || !password || !passwordCheck || !email){
            setErrorMessage("All fields must be provided.")
            event?.preventDefault;
        }
        else if( password !== passwordCheck){
            setErrorMessage("Passwords don't match.")
        }
        else if(!emailPattern.test(email)){
            setErrorMessage("Email is invalid.")
        }
        else if(!passwordPattern.test(password)){
            setErrorMessage("Password must be at least 8 characters long and contain one special character.")
        }
        else if (username.trim().length < 3){
            setErrorMessage("Usernames must be at least three characters long.")
        }
        (checkForUniqueUsername(formData))
        .then(promiseResult =>{
            if(promiseResult === null){
                registerUser(formData);
            }
            else{
                setErrorMessage("Username already exists. Chose another one.")
            }
        })
        .catch(error =>{
            setErrorMessage("Error finding username. Contact sys admin.");
        })
    }
}