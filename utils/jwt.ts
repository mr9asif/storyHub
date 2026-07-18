import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
const createToken = (payload:JwtPayload, secret:string, expiresIn:string)=>{
      
     const token = jwt.sign(
        payload, 
        secret, 
        {
            expiresIn
        } as SignOptions
    );

    return token;
}


const verifyToken = (token:string, secret:string)=>{
      try {
          const verifytoken = jwt.verify(token, secret);

       return {
        success:true,
        data:verifytoken
       }
      } catch (error:any) {
        console.log(error);

        return {
            success:false,
            error:error.message
        }
      }
}

export const Jwt={
    createToken, verifyToken
}
