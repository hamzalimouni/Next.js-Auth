import { SessionOptions } from "iron-session";

export interface SessionData {
    userId?: string;
    username?: string;
    img?: string;
    isPro?: boolean;
    isLoggedIn: boolean;
}

export const defualtSession: SessionData = {
    isLoggedIn: false
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "auth-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
        // secure: false, // in the production should be true
    }
}