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
            password:hashPass,
            profileId:{
                create:{
                    profilePhoto
                }
            }
        }
    });

    // await prisma.profile.create({
    //     data:{
    //         userId:CreatUser.id,
    //         profilePhoto
    //     }
    // })


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

const getProfileDB = async(userId:string)=>{
   
    const user = await prisma.user.findUniqueOrThrow({
        where:{id:userId},
        omit:{password:true},
        include:{profileId:true}
    })

    return user;
}


const updateProfile = async(userId:string, payload:any)=>{
      const { name, email, profilePhoto, bio}=payload;

      const updateUser = await prisma.user.update({
        where:{id:userId},
        data:{
            name,
            email,
            profileId:{
                update:{
                    profilePhoto,
                    bio
                }
            }
        },
        omit:{password:true},
        include:{profileId:true}
      })

      return updateUser;


}


export const CreateUserService ={
       createUser,
       getProfileDB,
       updateProfile

}