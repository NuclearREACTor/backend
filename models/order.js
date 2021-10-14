const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderItemSchema = new Schema({food_id:String,quantity:Number});

const OrderSchema = new Schema({
  orderItems :{type : [OrderItemSchema]},
  dateCreated:{
    type: Date,
    default:Date.now()
},

});

const Order = mongoose.model("orderdetail", OrderSchema);

module.exports = Order;
