const express = require("express");
const router = express.Router();
const Order=require('../Models/OrderModel')
const users=require('../Models/user')
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  process.env.stripe_SECRET_KEY
);
router.post("/order_payment",async (req, res) => {
  const {cart,user} = req.body;
  let newcart=[];
  cart.map((item)=>{
    newcart.push([item[0].name,item[1],item[3]])
  })
  const customer = await stripe.customers.create({
    metadata: {
      name: user.name,
      email:user.email,
      cart: JSON.stringify(newcart),
    },
  });
  const line_items=cart.map((item)=>{
    return{
        price_data:{
            currency:'inr',
            product_data:{
                name:item[0].name,
                images:[item[0].image],
                description:item[1],

            },
            unit_amount:item[2]*100,
        },
        quantity:item[3],
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "inr",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 6000,
              currency: "inr",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 3,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
    mode: "payment",
    shipping_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    customer: customer.id,
    success_url:"https://grocery-webesite-deploy.onrender.com/orders/success/?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });
  
  res.json({ id: session.id });
});



router.get('/success',async(req,res) => {

  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer=await stripe.customers.retrieve(session.customer)
  const cart=customer.metadata.cart
  const obj={
    user:customer.metadata.email,
    customerId:customer.id,
    customer_name:session.customer_details.name,
    customer_email:session.customer_details.email,
    customerPhonenumber:session.customer_details.phone,
    paymentintentId:session.payment_intent,
    products:cart,
    subtotal: session.amount_subtotal/100,
    total: session.amount_total/100,
    shipping: session.customer_details.address,
    payment_status: session.payment_status,
  }
  const newOrder = new Order(obj)
     newOrder.save();
     const user = await users.findOne({email: customer.metadata.email});
     await user.orders.push(newOrder);
     user.save();
    res.redirect(`${process.env.BASE_URL}/success`)


});
 router.put('/updateOrder',async(req,res)=>{
  const {id}=req.body;
  const status="delivered";
  try{
  const result=await Order.findOneAndUpdate({_id:id},{delivery_status:status})
  res.send("success")
  }catch(error){
    res.send(error)
  }

 })

router.get('/getAllorders',async(req,res)=>{
  try{
    const orders=await Order.find().sort({createdAt:-1});
    res.send(orders)
  }catch(error){
     res.status(400).send({message:error})
  }
})

module.exports = router;
