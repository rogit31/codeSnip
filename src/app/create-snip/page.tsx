"use client"

import { ChangeEvent, useState } from 'react';
import { createSnip } from '../actions';
import Editor from '@monaco-editor/react';


export default function CreateSnip() {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [language, setLanguage] = useState('css');
    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    return (
        <>
            <form className="createSnippet" action={validateForm}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" />

                <label htmlFor="monaco-editor">Code</label>
                <input type="hidden" value={code} name='code' id='code' />
                <Editor
                    theme='vs-dark'
                    height="50vh"
                    value={code}
                    onChange={(value: string | undefined) => setCode(value || '')}
                    language={language}
                />
                <label htmlFor="language">Language</label>
                <select name="language" id="language" onChange={handleLanguageChange}>
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
                    <option value="other">Other</option>
                </select>
            <button className="createSnippetSubmit"><input type="submit"/></button>
                <p>{errorMessage}</p>
            </form>
        </>
    );

    async function validateForm(formData: FormData) {
        const title = formData.get("title");
        const code = formData.get("code");
        if (!title || !code) {
            setErrorMessage("Missing title or code!");
        } else {
            await createSnip(formData);
        }
    }
}
