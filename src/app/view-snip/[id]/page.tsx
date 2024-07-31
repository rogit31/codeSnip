import SnipActions from '@/app/components/SnipActions';
import { getSnipById } from '@/app/actions';
import { cookies } from 'next/headers';

export default async function ViewSnip({ params }: any) {
    let snipData: any = null;
    const snipId = Number(params.id);
    snipData = await getSnipById(snipId);
    const userId = cookies().get("user_id")?.value as string;

    if (snipData) {
        return (
            <>
                <div className="createSnippet">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={snipData.title} readOnly />

                    <label htmlFor="snippetContent">Code</label>
                    <textarea name="snippetContent" id="snippetContent" defaultValue={snipData.code} readOnly></textarea>

                    <label htmlFor="language">Language</label>
                    <input type="text" readOnly defaultValue={snipData.language} id='language'/>
                    {userId == snipData.authorId ?  <SnipActions snipData = {snipData}/> : ''}
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
