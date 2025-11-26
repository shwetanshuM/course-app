const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");
const { JWT_ADMIN_PASSWORD } = require("../config");

adminRouter.post("/signup", async function (req, res) {
  const { email, password, name } = req.body;
  await adminModel.create({
    email: email,
    password: password,
    name: name,
  });
  res.json({
    msg: "signup up as user",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      error: "Incorrect credentials",
    });
  }
});





adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, price, imageUrl } = req.body;
  const course=await courseModel.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    creatorId: adminId,
  });

  res.json({
    message:"course created",
    courseId:course._id
  })
});









adminRouter.put("/course", adminMiddleware,async function (req, res) {
  const adminId = req.userId;
  const { title, description, price, imageUrl, courseId } = req.body;
  const course=await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId
  },{
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  });

  res.json({
    message:"course updates",
    courseId:courseId
  })
});







adminRouter.get("/course/bulk",adminMiddleware,async function (req, res) {
   const adminId = req.userId;
   const courses=await courseModel.find({
    creatorId:adminId
   })
   res.json({
    message:"courses are",
    courses
   })
});





module.exports = {
  adminRouter: adminRouter,
};
