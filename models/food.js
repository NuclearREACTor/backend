const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    required: false,
  },
  protein: {
    type: String,
    required: false,
  },
  calories: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("foodItem", foodSchema);

module.exports = Food;
