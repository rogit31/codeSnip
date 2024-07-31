"use client"
import  Link  from 'next/link';
import { logout } from '@/app/actions';
import "./../globals.css";

interface ProfileLogoutProps{
    userId: string;
    username: string;
}

export default function ProfileLogout({userId, username} : ProfileLogoutProps){
    return(
        <>                
        <li>
            {userId? <span id='username' className='topNavLink'>{username}</span>: <Link className="topNavLink" href="/login">Login</Link>}       
        </li>
        <li>
            {userId? <span className='topNavLink' onClick={async () => logout()}>Logout</span> :''}
        </li> 
        </>
    )
}