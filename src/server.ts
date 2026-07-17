import { prisma } from "../lib/prisma";
import app from "./app";
import config from "./config";

const main=async()=>{
    const Port = config.port;
    try {
     await prisma.$connect();
     console.log("database connected successfully!!")
    app.listen(Port,()=>{
        console.log(`server is runnin on ${Port}`)
    })
 } catch (error) {
    console.log("server error", error)
    await prisma.$disconnect();
    process.exit(1);
 }
}

main();