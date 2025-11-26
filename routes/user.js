const {Router}=require("express")
const {userModel, purchaseModel}=require("../db")
const userRouter=Router()
const {userMiddleware}=require("../middleware/user")
const jwt=require("jsonwebtoken")
const {JWT_USER_PASSWORD}=require("../config")






userRouter.post("/signup",async function(req,res){
  const {email,password,name}=req.body;
  await userModel.create({
    email:email,
    password:password,
    name:name,
  })
  res.json({
    msg:"signup up as user"
  })

})



userRouter.post("/signin",async function(req,res){
  const {email,password}=req.body;
  const user=await userModel.findOne({
    email:email,
    password:password,
  })

  if(user){
    const token=jwt.sign({
      id:user._id
    },JWT_USER_PASSWORD)
    res.json({
      token:token
  })

  }else{
    res.status(403).json({
      error:"Incorrect credentials",
    })
  }




  
})


userRouter.get("/purchases",userMiddleware,async function(req,res){
  const userId=req.userId;
  const purchases=await purchaseModel.find({
    userId
  })

  res.json({
    purchases
  })
})


module.exports={
  userRouter:userRouter
}