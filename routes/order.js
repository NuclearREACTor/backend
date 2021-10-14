var express = require("express");
var router = express.Router();
const Order = require("../models/order");


router.post("/place", function (req, res, next) {
    const orderDetails = req.body;
    let OrderList = []
    let currentOrderId
    for(const orderItem in orderDetails.body)
    {
      OrderList.push({"food_id":orderItem,"quantity":orderDetails.body[orderItem]})
    }
    // Adding to Database
    const order = new Order({orderItems:OrderList});
    order.save().then((order) => {
      currentOrderId = order._id;
      res.send(currentOrderId);
    });
   
    
});

router.get("/get", function (req, res, next) {
  Order.find({})
    .then((result) => {
      console.log(result[0].orderItems[0].food_id)
      res.send(result[0].orderItems.quantity)
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/findById/:id",function(req,res,next){
        Order.findById(req.params.id)
        .then(orderFound =>{
          res.send(orderFound.orderItems);
        })
        .catch(err => {
          console.log(err);
        });
});



router.get("/add", function(req,res,next){
  orderList = [{"food_id":"ssaa","quantity":3},{"food_id":"ddsss","quantity":3}]

  const order = new Order({orderItems:orderList});
    order.save().then((order) => {
      console.log(order._id);
    });
    res.send("Adding Order");
});

module.exports = router;
