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

export const CreateUserController={
    createUser
}