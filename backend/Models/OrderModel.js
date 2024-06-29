const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user:{ type: String, required: true },
    customerId: { type: String, required: true },
    customer_name:{ type: String, required: true },
    customer_email:{ type: String, required: true },
    customerPhonenumber:{ type: String, required: true },
    paymentintentId:{type:String,required:true},
    products: { type: Object, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    payment_method: { type: String, required: true ,default:"card"},
  },
  { timestamps: true }
);

module.exports= mongoose.model("Order", orderSchema);
