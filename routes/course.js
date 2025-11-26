const {Router}=require("express")

const courseRouter=Router()


courseRouter.post("/purchase",function(req,res){
  res.json({
    message:"buying rn"
  })
})


courseRouter.get("/preview",function(req,res){
  res.json({
    message:"all courses"
  })
})

module.exports={
  courseRouter:courseRouter
}