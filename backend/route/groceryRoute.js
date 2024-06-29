const express = require("express")
const mongoose = require("mongoose")
const grocery=require('../Models/fruits')
const router = express.Router();


router.post("/add",(req,res)=>{
    const {name} = req.body;
    grocery.findOne({name})
     .then((product) => {
         if(product) {
             res.json("product already exists")
         }
         else
         {
             const newProduct=new grocery(req.body)
             newProduct.save()
             res.send("success")
         }
     })
     .catch(err => res.json(err))
})
router.get("/getallproducts", async(req, res) => {

    try {
        const products = await grocery.find()
        res.send(products)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});
router.post("/deleteProduct", async(req, res) => {
  
    const id = req.body.id

    try {
        await grocery.findOneAndDelete({_id : id})
        res.send('Product Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

module.exports = router