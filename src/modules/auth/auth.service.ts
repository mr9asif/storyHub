import bcrypt from 'bcrypt';
import { prisma } from "../../../lib/prisma";
import { LoginPayload } from "./auth.interface";

const loginUser=async(payload:LoginPayload)=>{

    const {email, password}= payload;

    const user = await prisma.user.findUniqueOrThrow({
        where:{email}
    })
     const matchPassword = await bcrypt.compare(password, user.password);

     if(!matchPassword){
        throw new Error("Invalid Credential!")
     }

     return user;
}

export const AuthService={
    loginUser
}