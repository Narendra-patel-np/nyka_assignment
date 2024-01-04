const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: String,
    picture: String,
    description: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    category: String,
    price: Number,
    created_at: String,
    updated_at: String,
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};
