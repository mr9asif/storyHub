import bcrypt from 'bcrypt';
import { prisma } from "../../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
const createUser =async(payload:RegisterUserPayload)=>{

    const {name, email, password, profilePhoto}=payload;

    const existUser = await prisma.user.findUnique({
        where:{email}
    })

    if(existUser){
        throw new Error("user already exit!")
    }

    const hashPass = await bcrypt.hash(password, 10);

    const CreatUser = await prisma.user.create({
        data:{
            name,
            email,
            password:hashPass
        }
    });

    await prisma.profile.create({
        data:{
            userId:CreatUser.id,
            profilePhoto
        }
    })


    const user = await prisma.user.findUnique({
         where:{
            id:CreatUser.id,
            email:CreatUser.email || email
         },
         omit:{password:true},
         include:{
            profileId:true
         }


    })

    return user;


}


export const CreateUserService ={
       createUser
}