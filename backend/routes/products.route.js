const express = require("express");
const { ProductModel } = require("../model/product.model");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const getData = await volunteerModel.find();
    res.status(200).send(getData);
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong." });
  }
});
productRouter.post("/", async (req, res) => {
  //   const { name, picture, description, gender, category, price } = req.body;
  const newProduct = new ProductModel(req.body);
  await newProduct.save();
  res.status(201).save({ msg: "New product has been added." });
});
productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await ProductModel.findOne({ _id: id });
    res.status(200).send(prod);
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});
productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(204).send(prod);
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await ProductModel.findByIdAndDelete({ _id: id });
    res.status(202).send(prod);
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

module.exports = {
  productRouter,
};
