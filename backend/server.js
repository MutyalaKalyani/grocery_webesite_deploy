const express = require("express")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const path=require("path")
const cors = require("cors")
const users=require('./Models/user.js')
const grocery=require('./Models/fruits.js')
const db=import('./db.js')
const jwt = require("jsonwebtoken");
const app = express()

app.use(express.json())
app.use(cors());
app.use("/products",require('./route/groceryRoute.js'))
app.use("/orders",require('./route/Orders.js'))

app.post("/login", async(req, res) => {
    const {email, password} = req.body;
    let user = await users.findOne({ email: req.body.email });
    if (!user) return res.send("Invalid email or password");
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.send("Invalid email or password");
  
    const jwtSecretKey = `${process.env.JWT_KEY}`
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        jwtSecretKey,{expiresIn:'24h'}
      );
  
    res.send(token);
})

app.post("/register", async (req, res) => {
    let user = await users.findOne({ email: req.body.email });
  if (user) return res.send("User exists");

  const { name, email, password } = req.body;

  user = new users({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
    
      const jwtSecretKey =`${process.env_JWT_KEY}`
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          orders:[],
          isAdmin: user.isAdmin,
        },
        jwtSecretKey,{expiresIn:'24h'}
      );

    res.send(token);
})
app.put("/updateprofile",async(req,res)=>{
    const {Username,email,Password} = req.body;
    const salt =await bcrypt.genSalt(10);
   const password = await bcrypt.hash(Password, salt);
  await users.findOneAndUpdate({email:email},{name:Username,password:password})
  const result=await users.findOne({email:email})
   res.send(result);
})
app.get("/getUser",(req,res)=>{
    const token = req.header("x-auth-token");
  if (!token)
    return res.send("Access denied. Not authenticated");
  try {
    const jwtSecretKey = `${process.env.JWT_KEY}`
    const decoded =jwt.verify(token, jwtSecretKey);

    const user = decoded;
    res.send(user);
  } catch (ex) {
    res.status(400).send("Invalid auth token...");
  }
})
app.get("/allUsers",async(req,res)=>{
  try {
    const allUsers= await users.find()
    res.send(allUsers)
} catch (error) {
    return res.status(400).json({ message: error });
}
})


app.post("/userOrders",async(req,res)=>{
const {user}=req.body
    let order= await users.findOne({email:user.email})
    res.send(order.orders)
})
app.get("/getallproducts", async(req, res) => {

    try {
        const products = await grocery.find()
        res.send(products)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log("server is running")
})
