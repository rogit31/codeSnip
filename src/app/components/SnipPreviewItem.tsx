import { cookies } from 'next/headers';
import SnipActions from './SnipActions';
import Link from 'next/link';

interface Snip {
    id: number;
    title: string;
    code: string;
    language: string;
    authorId: string;
}

interface SnipPreviewItemProps {
    snip: Snip;
}

export default function SnipPreviewItem({ snip }: SnipPreviewItemProps) {
    const userId = cookies().get("user_id")?.value as string;

    return (
        <div className="snipPreviewItem" key={snip.id}>
            <Link href={`view-snip/${snip.id}`}>
            <h3 className='snipPreviewTitle'>{snip.title}</h3>
                <p className='snipPreviewCode'>{snip.code}</p>
                <p className='snipPreviewLanguage'>{snip.language}</p>
            </Link>
            {userId && userId == snip.authorId ? (
                <SnipActions snipData={snip} />
            ) : null}
        </div>
    );
}
//TODO for some reason despite userId and snip.authorId being the same here, the SnipActions don't appear with strict comparison. They're not the same type but why?

