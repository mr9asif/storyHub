import app from "./app";

const main=()=>{
    const Port = process.env.PORT || 5000;
 try {
    app.listen(Port,()=>{
       console.log(`server is runnin on ${Port}`)
    })
 } catch (error) {
    console.log("server error", error)
    process.exit(1);
 }
}

main();