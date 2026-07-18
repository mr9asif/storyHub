import { NextFunction, Request, Response } from "express";
import httpstatus from 'http-status';
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { CreateUserService } from "./user.service";


const createUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
        const payload = req.body;
        const user = await CreateUserService.createUser(payload);

        sendResponse(res,{
            success:true,
            statusCode:httpstatus.CREATED,
            message:"user created successfully",
            data:{user}
            
        })
})

const getMyprofile = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
        // const {accessToken}=req.cookies;
 

        // const verifyToken =Jwt.verifyToken(accessToken, config.jwt_access_secret!)

    


        // if(typeof verifyToken === "string"){
        //     throw new Error("error")
        // }

        const myProfile = await CreateUserService.getProfileDB(req.user?.id as string)

        sendResponse(res, {
            success:true,
            statusCode:httpstatus.OK,
            message:"get Profile Successfully",
            data:{myProfile}
        })
})



const updateProfile = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
       const userId = req.user?.id as string;
       const payload = req.body;

       const result = await CreateUserService.updateProfile(userId, payload);

       sendResponse(res, {
        success:true,
        statusCode:httpstatus.OK,
        message:"user profile updated successfully!!",
        data:{result}
       })
})

export const CreateUserController={
    createUser,
    getMyprofile,
    updateProfile
}