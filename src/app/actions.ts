"use server"
import bcrypt from "bcryptjs-react";
import { redirect} from "next/navigation";
import { PrismaClient, Prisma } from '@prisma/client'
import { cookies } from "next/headers";
const prisma = new PrismaClient()

interface Snip{
    id:number,
    title:string,
    code:string,
    language:string | null
}
interface User{
    id: number,
    username: string,
    password: string,
    role: string,
    email: string,
}

export async function getSnipById(id:number):Promise<Snip | null>{
    if(id){
        const snip = await prisma.snip.findUnique({
            where:{
                id: id
            }
        })
        return snip;
    }
    return null;
}

export async function createSnip(formData: FormData, code:any){
    const userId = Number(cookies().get("user_id")?.value as string);
    
    try{
        const snip = await prisma.snip.create({
            data:{
                title: formData.get("title") as string,
                code: formData.get("snippetContent") as string,
                language: formData.get("language") as string,
                authorId: userId,
            }
        })
        
    }
    catch{
        console.error('Failed in creating snip.' + userId)
        console.error(formData.get("userId"));
    }
    redirect('/');
}

export async function deleteSnipById(formData: FormData){
    const snipId = formData.get('id') as string;
        try{
            await prisma.snip.delete({
                where: {
                id: Number(snipId),
                }
            })
        }
        catch (error) {
            console.error("couldn't delete the snip.", error);
        }
        redirect ('/')
}

export async function registerUser(formData: FormData){
    const username = formData.get("username") as string;
    const passwordPlain = formData.get("password") as string;
    const email = formData.get("email") as string;
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(passwordPlain, salt);
    
    try{
        const user = await prisma.user.create({
            data:{
                username: username,
                password: hash,
                email: email,
                role: username,
            }
        })
        
    }
    catch(error){
        console.error("Error creating user." + {error});
        return false;
    }
    redirect('/login');
}

export async function checkForUniqueUsername(formData: FormData){
    const username = formData.get("username") as string;
    const user = prisma.user.findUnique({
        where: {
            username: username
        },
    });
    if (user === null){
        return user;
    }
    else{
        return user;
    };
}

export async function checkPasswordHash(formData: FormData){
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try{
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                username:username
            }
        });
        if(bcrypt.compareSync(password, user.password)){
            console.log("logging in")
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        console.error("Error checking password." + error);
        return false;
    }
}

export async function checkLoginCredentials(formData: FormData): Promise<boolean>{
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

        const user = await prisma.user.findFirst({
            where:{
                username: username
            }
        })
    
    return user !== null;
}

export async function login(formData: FormData){
    const username = formData.get("username") as string; 
    try{
        const user = await prisma.user.findFirstOrThrow({
            where:{
                username: username
            }
        })
        console.log(user);
        const userId = String(user.id);
        const userRole = String(user.role);
        cookies().set("user_id", userId, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        cookies().set("user_role", userRole, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        cookies().set("username", username, {httpOnly: true, secure: process.env.NODE_ENV === 'production'})
    }
    catch(error){
        console.error("Error authenticating."+ error);
        return false;
    }
    redirect("/");
}

export async function logout(){
    console.log("click");
    cookies().delete("user_id");
    cookies().delete("user_role");
    cookies().delete("username");
    redirect('/');
}