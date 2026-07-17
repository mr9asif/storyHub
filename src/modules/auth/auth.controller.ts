import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     const payload = req.body;

     const {accessToken, refreshToken} = await AuthService.loginUser(payload)


      res.cookie("accessToken", accessToken, {
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24 //1d

      })

       res.cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24 * 7 //7d

      })


     sendResponse(res, {
        success:true,
        statusCode:httpStatus.OK,
        message:"User login successfully!!",
        data:{accessToken, refreshToken}
     })
})

export const AuthController ={
    loginUser
}