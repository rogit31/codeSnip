"use client"

import { useRef, useState } from 'react';
import { PrismaClient} from '@prisma/client'
import { createSnip } from '../actions';
import Editor from '@monaco-editor/react';

//TODO: Need to somehow extract the monaco editor data, probably using state now that we've moved the onus of finding the user.id onto the server action,
// I can just use state and pass that to the createSnip function? Not sure if I should make all of the editables like that, probably doesn't matter.

const prisma = new PrismaClient()
export default async function CreateSnip(){
    const editorRef = useRef(null);


    function handleSubmit(event:any){
        if(editorRef.current.getValue() === null){
            event?.preventDefault;
        }
        
    }
    
    return(
        <>
        <form className="createSnippet" action={createSnip(data, code)} onSubmit={handleSubmit()} method="POST">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title"/>

            <label htmlFor="snippetContent">Code</label>
            <textarea name="snippetContent" id="snippetContent"></textarea>
            <Editor
            height="50vh"
            defaultLanguage='JavaScript'
            defaultValue='//Write your code here'
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
        </form>
        </>
    )
}