"use client"

import Link from 'next/link';
import { deleteSnipById } from '@/app/actions';

interface Snip {
    id: number;
    title: string;
    code: string;
    language: string;
}

interface SnipPreviewItemProps {
    snip: Snip;
}

export default function SnipPreviewItem({ snip }: SnipPreviewItemProps) {
    return (
        <div className="snipPreviewItem" key={snip.id}>
            <h3 className='snipPreviewTitle'>{snip.title}</h3>
            <p className='snipPreviewCode'>{snip.code}</p>
            <p className='snipPreviewLanguage'>{snip.language}</p>
            <div className='snipPreviewActionsWrapper'>
                <Link href={`edit-snip/${snip.id}`}>
                    <button type="button">
                        <img src="/editIcon.svg" alt="Edit" />
                    </button>
                </Link>
                <form className='snipPreviewIcon' action={deleteSnipById} onSubmit={handleDelete} method='post'>
                    <input type="hidden" name='id' value={snip.id} />
                    <button type="submit">
                        <img src="/trashIcon.svg" alt="Delete" />
                    </button>
                </form>
            </div>
        </div>
    );

    function handleDelete(event: React.FormEvent<HTMLFormElement>) {
        if (!confirm("Are you sure you want to delete this snip?")) {
            event.preventDefault();
        }
    }
}
