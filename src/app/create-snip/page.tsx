import {redirect} from 'next/navigation'
import { PrismaClient} from '@prisma/client'
import { cookies } from "next/headers";
import { createSnip } from '../actions';

const prisma = new PrismaClient()
export default async function CreateSnip(){
    const userId = cookies().get("user_id")?.value

    return(
        <>
        <form className="createSnippet" action={createSnip} method="POST">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title"/>

            <label htmlFor="snippetContent">Code</label>
            <textarea name="snippetContent" id="snippetContent"></textarea>

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
            <input type="hidden" name='userId' id='userId' value={userId}/>
            <button className="createSnippetSubmit"><input type="submit"/></button>
        </form>
        </>
    )
}