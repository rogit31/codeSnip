import { cookies } from "next/headers"
import "./../globals.css"
import Link from 'next/link';
import { logout } from "../actions";
import ProfileLogout from "./ProfileLogout";


export default function Header(){

    const userId = cookies().get("user_id")?.value as string;
    const username = cookies().get("username")?.value as string;
    
    return(
        <>
        <nav>
            <ul className="topNav">
                <span className="topNavGroupWrapper">
                <li>
                    <Link className="topNavLink" href='/'>Home</Link>
                </li>
                <li>
                    {userId? <Link className="topNavLink" href="/create-snip">Create Snip</Link> : '' }
                    
                </li>
                <li>
                    {userId? <Link className="topNavLink" href="/your-snips">Your Snips</Link> : ''}
                </li>
                </span>
                <span className="topNavGroupWrapper">
                    <ProfileLogout userId={userId} username = {username}/>
                </span>
            </ul>
        </nav>
        
        </>
    )

}