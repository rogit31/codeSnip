import { PrismaClient } from '@prisma/client';
import {redirect} from 'next/navigation';
import SnipActions from '@/app/components/SnipActions';

const prisma = new PrismaClient();

interface Snip {
    id: number;
    title: string;
    code: string;
    language: string;
}

export default async function ViewSnip({ params }: any) {
    let snipData: any = null;
    const snipId = Number(params.id);


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
                <div className="createSnippet">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={snipData.title} readOnly />

                    <label htmlFor="snippetContent">Code</label>
                    <textarea name="snippetContent" id="snippetContent" defaultValue={snipData.code} readOnly></textarea>

                    <label htmlFor="language">Language</label>
                    <input type="text" readOnly defaultValue={snipData.language} />
                </div>
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
