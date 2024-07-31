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
    const [errorMessage, setErrorMessage] = useState("");
    const [language, setLanguage] = useState('');
    const handleLanguageChange = (event: any) => {
        const language = event.target.value as string;
        setLanguage(language)
    };

    useEffect(() => {
        getSnipById(snipId)
            .then((fetchedSnip) => { 
                setSnip(fetchedSnip);
                if (fetchedSnip !== null){
                    setCode(fetchedSnip.code);
                    setLanguage(fetchedSnip.language);
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
            <form className="createSnippet" action={formValidation}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" defaultValue={snip.title} />

                <label htmlFor="monaco-editor">Code</label>
                <input type="hidden" value={code} name='code' id='code' />
                <Editor
                    theme='vs-dark'
                    height="50vh"
                    language={language}
                    value={code}
                    onChange={(value: string | undefined) => setCode(value ?? '')}
                />
                <label htmlFor="language">Language</label>
                <select name="language" id="language" defaultValue={snip.language ?? 'Other'} onChange={handleLanguageChange}>
                    <option value="css">CSS</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                    <option value="javascript">JavaScript</option>
                    <option value="lua">Lua</option>
                    <option value="php">PHP</option>
                    <option value="python">Python</option>
                    <option value="react">React</option>
                    <option value="rust">Rust</option>
                    <option value="typescript">TypeScript</option>
                    <option value="zig">Zig</option>
                    <option value="Other">Other</option>
                </select>
                <input type="hidden" value={snipId} name='snipId' id='snipId' />
                <button className="createSnippetSubmit"><input type="submit" /></button>
                <p>{errorMessage}</p>
            </form>
        </>
    );

    async function formValidation(formData:FormData){
        const title = formData.get("title");
        const code = formData.get("code");
        if(!title || !code){
            event?.preventDefault;
            setErrorMessage("Title or code cannot be empty.")
        }
        else{
            updateSnip(formData);
        }
    }
}
