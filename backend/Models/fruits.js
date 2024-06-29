const mongoose = require("mongoose");

const grocerySchema = mongoose.Schema({
    name : {type: String , require},
    type : {type: String , require},
    image: {type: String, require},
    priceper250g : {type: String , require},
    priceper500g : {type: String , require}, 
    status:{type:String,  require , default: "Availabe"}
} , {
    timestamps : true
})

module.exports = mongoose.model('grocery' , grocerySchema);