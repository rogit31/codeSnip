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
            {snips.map((snip:any) => (
                <SnipPreviewItem key={snip.id} snip={snip} />
))}
        </div>
        </>
    )
}
//TODO: Test if this actually works by making another account, making a snip and checking if it works. 