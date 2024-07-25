"use client"
import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { updateSnip, getSnipById } from '../../actions';

interface Snip {
    id: number;
    title: string;
    code: string;
    language: string;
}

export default function EditSnip({ params }: any) {

    const snipId = Number(params.id);
    const [code, setCode] = useState('');
    const [snip, setSnip] = useState<Snip | null>(null);

    useEffect(() => {
        getSnipById(snipId)
            .then((fetchedSnip) => {
                setSnip(fetchedSnip);
                if (fetchedSnip !== null){
                    setCode(fetchedSnip.code);
                }
            })
            .catch(error => {
                console.error("Failed to fetch snip:", error);
            });
    }, []);

    if (snip === null) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <p>{params.id}</p>
            <form className="createSnippet" action={updateSnip} method="post">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" defaultValue={snip.title} />

                <label htmlFor="monaco-editor">Code</label>
                <input type="hidden" value={code} name='code' id='code' />
                <Editor
                    theme='vs-dark'
                    height="50vh"
                    defaultLanguage='JavaScript'
                    value={code}
                    onChange={(value: string | undefined) => setCode(value ?? '')}
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
