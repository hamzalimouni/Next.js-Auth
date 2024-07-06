"use server"
import { SessionData, sessionOptions } from "@/lib"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { defualtSession } from './lib';
import { redirect } from "next/navigation";

const username = "john";
const isPro = true;

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if(!session.isLoggedIn){
        session.isLoggedIn = defualtSession.isLoggedIn;
    }
    return session;
}


export const login = async (prevState: {error: undefined | string}, formData: FormData) => {
    const session = await getSession();
    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;

    if(formUsername !== username){
        return {error: "Wrong Credentials!"}
    }

    session.userId = "1";
    session.username = formUsername;
    session.isPro = isPro;
    session.isLoggedIn = true;

    await session.save();
    redirect("/");
}
export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
}