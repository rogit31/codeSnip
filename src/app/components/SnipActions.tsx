"use client"
import Link from "next/link";
import { deleteSnipById } from "../actions";


export default function SnipActions({snipData} :any){
    return(
        <>
        <div className='snipPreviewActionsWrapper'>
        <Link href={`/edit-snip/${snipData.id}`}>
            <button type="button">
                <img src="/editIcon.svg" alt="Edit" />
            </button>
        </Link>
        <form className='snipPreviewIcon' onSubmit={handleDelete} method='post'>
            <input type="hidden" name='id' value={snipData.id} />
            <button type="submit">
                <img src="/trashIcon.svg" alt="Delete" />
            </button>
        </form>
    </div>
        </>
    )
    function handleDelete(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (confirm("Are you sure you want to delete this snip?")) {
            deleteSnipById(snipData.id);
        }
    }
}