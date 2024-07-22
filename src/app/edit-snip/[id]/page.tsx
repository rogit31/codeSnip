import { PrismaClient } from '@prisma/client';
import {redirect} from 'next/navigation'

const prisma = new PrismaClient();

interface Snip {
    id: number;
    title: string;
    code: string;
    language: string;
}

export default async function EditSnip({ params }: any) {
    let snipData: any = null;
    const snipId = Number(params.id);

    async function updateSnip(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;
        const code = formData.get("snippetContent") as string;
        const language = formData.get("language") as string;

         await prisma.snip.update({
            where: {
                id: snipId
            },
            data: {
                title: title, code: code, language: language
            }
        });
        redirect ('/');

    }

    async function getSnip(id: number) {
        try {
            return await prisma.snip.findUnique({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            console.error('Error fetching snip:', error);
            return null;
        }
    }

    snipData = await getSnip(snipId);

    if (snipData) {
        return (
            <>
                <form className="createSnippet" action={updateSnip} method="post">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={snipData.title} />

                    <label htmlFor="snippetContent">Code</label>
                    <textarea name="snippetContent" id="snippetContent" defaultValue={snipData.code}></textarea>

                    <label htmlFor="language">Language</label>
                    <select name="language" id="language" defaultValue={snipData.language ?? 'Other'}>
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

                    <button className="createSnippetSubmit"><input type="submit" /></button>
                </form>
            </>
        );
    } else {
        return (
            <div>
                <h1>Snip not found.</h1>
                <h1>{snipId}</h1> 
            </div>
        );
    }
}
