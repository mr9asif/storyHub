import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
const Jwt = (payload:JwtPayload, secret:string, expiresIn:string)=>{
      
     const token = jwt.sign(
        payload, 
        secret, 
        {
            expiresIn
        } as SignOptions
    );

    return token;
}

export default Jwt;
