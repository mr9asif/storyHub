import bcrypt from 'bcrypt';
import { prisma } from "../../../lib/prisma";

import { JwtPayload } from 'jsonwebtoken';
import { Jwt } from '../../../utils/jwt';
import config from '../../config';
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


          const JwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    

     const accessToken =  Jwt.createToken(JwtPayload, config.jwt_access_secret!, '1d')
      
      const refreshToken =  Jwt.createToken(JwtPayload, config.jwt_access_secret!, '7d')

    return {
        accessToken, refreshToken
    }

}

const refreshToken = async(refreshToken:string)=>{
   console.log(refreshToken)
    const verifytoken =  Jwt.verifyToken(refreshToken, config.jwt_refresh_secret!);
    console.log("v", verifytoken)
     if(!verifytoken.success){
        throw new Error(verifytoken.error)
     }

    const {id}= verifytoken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where:{id}
    })

    if(user.activeStatus === "BLOCKED"){
        throw new Error("User is blocked!")
    }

    const payload ={
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }

        const accessToken = Jwt.createToken(payload, config.jwt_access_secret!, config.jwt_access_expires_in!)

        return {accessToken};
}
export const AuthService={
    loginUser,
    refreshToken
}