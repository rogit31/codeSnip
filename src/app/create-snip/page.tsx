"use client"

import { useState } from 'react';
import { PrismaClient} from '@prisma/client'
import { createSnip } from '../actions';
import Editor from '@monaco-editor/react';

//TODO: Still need to find a way to change the language. From a UX perspective, changing the language of the snip should trigger the language of the monaco editor to change as well. 
//Also would be nice if the code could be tested, but that involves most likely some kind of third party reliance which kinda sucks. 
//Also also, the editor currently erases white space and line returns. There should be some kind of setting for this surely. 

const prisma = new PrismaClient()
export default function CreateSnip(){
const [code, setCode] = useState('');
const [errorMessage, setErrorMessage] = useState('');
    return(
        <>
        <form className="createSnippet" action={validateForm} method="POST">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title"/>

            <label htmlFor="monaco-editor">Code</label>
            <input type="hidden"value={code} name='code' id='code'/>
            <Editor
            theme='vs-dark'
            height="50vh"
            defaultLanguage='JavaScript'
            defaultValue='//Write your code here'
            value={code}
            onChange={(value:any)=> setCode(value)}
            />
            <label htmlFor="language">Language</label>
            <select name="language" id="language">
                <option value="CSS">CSS</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="C#">C#</option>
                <option value="Go">Go</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Lua">Lua</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="React">React</option>
                <option value="Rust">Rust</option>
                <option value="Zig">Zig</option>
                <option value="Other">Other</option>
            </select>
            <button className="createSnippetSubmit"><input type="submit"/></button>
            <p>{errorMessage}</p>
        </form>
        </>
    )
    async function validateForm(formData:FormData){
   
        const title = formData.get("title");
        const code = formData.get("code");
        if(!title || !code){
            setErrorMessage("Missing title or code!");
            event?.preventDefault;
        }
        else{
            createSnip(formData);
        }
    }
}