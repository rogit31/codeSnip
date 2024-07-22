import {PrismaClient, Prisma} from '@prisma/client';
import SnipPreviewItem from './SnipPreviewItem';

const prisma = new PrismaClient();

export default async function SnipsPreview(){
const snips = await prisma.snip.findMany();

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