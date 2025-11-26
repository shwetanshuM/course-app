require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const {userRouter}=require("./routes/user")
const {courseRouter}=require("./routes/course")
const {adminRouter}=require("./routes/admin")
const app=express()
app.use(express.json())

app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminRouter)


async function main(){
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(3001)
  console.log("listening on p3001")
  
}

main()



