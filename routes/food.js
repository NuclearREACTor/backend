var express = require("express");
var router = express.Router();
const Food = require("../models/food");

/* GET home page. */
router.get("/get", function (req, res, next) {
  let foodType = req.query.foodType;
  if (foodType) {
    Food.find()
      .where("foodType")
      .equals(foodType)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Food.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get("/get/foodTypes", function (req, res, next) {
  const foodSet = new Set();
  Food.find()
    .then((result) => {
      for (let items in result) {
        foodSet.add(result[items].foodType);
      }
      console.log(foodSet);
      const arr = [...foodSet];
      res.send(JSON.stringify(arr));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/get/search", function (req, res, next) {
  let foodName = req.query.foodName;
  if (foodName) {
    Food.find({ foodName: { $regex: foodName, $options: "i" } })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Food.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get("/add", function (req, res, next) {
  let foodList = [
    {
      foodName: "Chicken Burrito",
      foodType: "Burrito",
      protein: "chicken",
      calories: 975,
      price: 5,
    },
    {
      foodName: "Steak Burrito",
      foodType: "Burrito",
      protein: "steak",
      calories: 945,
      price: 6,
    },
    {
      foodName: "Carnitas Burrito",
      foodType: "Burrito",
      protein: "carnitas",
      calories: 1005,
      price: 8,
    },
    {
      foodName: "Barbacoa Burrito",
      foodType: "Burrito",
      protein: "barbacoa",
      calories: 965,
      price: 9,
    },
    {
      foodName: "Chorizo Burrito",
      foodType: "Burrito",
      protein: "chorizo",
      calories: 1095,
      price: 10,
    },
    {
      foodName: "Sofritas Burrito",
      foodType: "Burrito",
      protein: "sofritas",
      calories: 945,
      price: 12,
    },
    {
      foodName: "Chicken Burrito Bowl",
      foodType: "Burrito Bowl",
      calories: 630,
      price: 15,
    },
    { foodName: "Chicken Bowl", calories: 630 },
    {
      foodName: "Steak Burrito Bowl",
      foodType: "Burrito Bowl",
      calories: 600,
      price: 12,
    },
    { foodName: "Steak Bowl", calories: 600, price: 10 },
    {
      foodName: "Carnitas Burrito Bowl",
      foodType: "Burrito Bowl",
      calories: 660,
      price: 12,
    },
    { foodName: "Carnitas Bowl", calories: 660, price: 12 },
    {
      foodName: "Barbacoa Burrito Bowl",
      foodType: "Burrito Bowl",
      calories: 620,
      price: 12,
    },
    { foodName: "Barbacoa Bowl", calories: 620, price: 12 },
    {
      foodName: "Chorizo Burrito Bowl",
      foodType: "Burrito Bowl",
      calories: 750,
      price: 12,
    },
    { foodName: "Chorizo Bowl", calories: 750, price: 12 },
    {
      foodName: "Sofritas Burrito Bowl",
      foodType: "Burrito Bowl",
      calories: 600,
      price: 12,
    },
  ];

  for (var a of foodList) {
    const food = new Food({
      foodName: a["foodName"] != null ? a["foodName"] : null,
      foodType: a["foodType"] != null ? a["foodType"] : null,
      protein: a["protein"] != null ? a["protein"] : null,
      calories: a["calories"] != null ? a["calories"] : null,
      price: a["price"] != null ? a["price"] : null,
    });
    food.save().then(() => {
      console.log(`${food.foodName} added to DB`);
    });
  }

  res.send("Adding Foods");
});

module.exports = router;
