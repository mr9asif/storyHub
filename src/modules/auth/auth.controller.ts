import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     const payload = req.body;

     const user = await AuthService.loginUser(payload)

     sendResponse(res, {
        success:true,
        statusCode:httpStatus.OK,
        message:"User login successfully!!",
        data:{user}
     })
})

export const AuthController ={
    loginUser
}