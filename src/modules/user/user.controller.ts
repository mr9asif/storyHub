import { Request, Response } from "express";
import httpstatus from 'http-status';
import { CreateUserService } from "./user.service";

const createUser = async(req:Request, res:Response)=>{
  try {
      const payload = req.body;
   const user = await CreateUserService.createUser(payload);
    
   res.status(httpstatus.CREATED).json({
    success:true,
    statusCode:httpstatus.CREATED,
    message:"User created successfully!",
    data:{
        user
    }
   })
  } catch (error) {
     console.log(error);
         res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpstatus.INTERNAL_SERVER_ERROR,
            message: "Failed to register user",
            error: (error as Error).message
        })
  }
}

export const CreateUserController={
    createUser
}