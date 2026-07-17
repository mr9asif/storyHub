import { Response } from "express";

interface TMeta{
       limit:number,
 page:number,
        total:number
}

interface TResponse<T>{
    success:boolean,
    statusCode: number,
    message:string,
    data:T
    meta?:TMeta}

export const sendResponse=<T>(res:Response, data:TResponse<T>)=>{
        res.status(data.statusCode).json({
          succes:data.success,
          statusCode:data.statusCode,
          message:data.message,
          data:data.data,
          meta:data.meta
       })
}


