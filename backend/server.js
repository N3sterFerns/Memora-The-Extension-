import app from "./src/app.js"
import connectDB from "./src/config/dbConnect.js"



connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Listening Server ${process.env.PORT}....`)
    })

}).catch((err)=>{
    console.log(err)
})
