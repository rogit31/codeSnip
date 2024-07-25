import {PrismaClient, Prisma} from '@prisma/client';
import SnipPreviewItem from '../components/SnipPreviewItem';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export default async function SnipsPreview(){
    const userId = Number(cookies().get("user_id")?.value);
const snips = await prisma.snip.findMany({where:{
    authorId: userId
}});

    return(
        <>
        <div className='snipPreviewWrapper'>
            {snips.length === 0? "No snips yet :(" : ''}
            {snips.map((snip:any) => (
                <SnipPreviewItem key={snip.id} snip={snip} />
))}
        </div>
        </>
    )
}
