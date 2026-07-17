export interface LoginPayload{
    email:string,
    password:string
}


export type JWTPayload={
    userId:string,
    name:string,
    email:string,
    role:string,
    profilePhoto:string
}