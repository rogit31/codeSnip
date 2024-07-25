"use client"
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { Editor } from '@monaco-editor/react';
import { updateSnip } from '../../actions'
import { getSnipById } from '../../actions';

const prisma = new PrismaClient();

interface Snip {
    id: number;
    title: string;
    code: string;
    language: string;
}
//TODO: You need to update this page to correctly fetch the snip using the server action, as this needs to be a client component to use the monaco editor. Check actions + this page, should be easy.
export default function EditSnip({ params }: any) {
    let snipData: any = null;
    const snipId = Number(params.id);
    const [code, setCode] = useState('');

    const snip:any = getSnipById(snipId);

        return (
            <>
                <form className="createSnippet" action={updateSnip} method="post">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={snip.title} />

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
                    <select name="language" id="language" defaultValue={snip.language ?? 'Other'}>
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
                    <input type="hidden" value={snipId} name='snipId' id='snipId' />
                    <button className="createSnippetSubmit"><input type="submit" /></button>
                </form>
            </>
        );
    
}
