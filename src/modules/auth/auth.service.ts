import bcrypt from 'bcrypt';
import { prisma } from "../../../lib/prisma";
import jwt from '../../../utils/jwt';
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

    

     const accessToken =  jwt(JwtPayload, config.jwt_access_secret!, '1d')
      
      const refreshToken =  jwt(JwtPayload, config.jwt_access_secret!, '7d')

    return {
        accessToken, refreshToken
    }

}

export const AuthService={
    loginUser
}