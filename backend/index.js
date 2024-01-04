const express = require("express");
const { UserModel } = require("./model/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { connection } = require("./db");
const { productRouter } = require("./routes/products.route");

const app = express();

app.use("products", productRouter);
app.post("/register", async (req, res) => {
  const { name, email, password, avatar, created_at, updated_at } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .send({ msg: "User already exist, Please Login.." });
    } else {
      //   const passwordRegex =
      //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&*!]){8}/;
      //   const passwordCheck = passwordRegex.test(password);
      //   if (!passwordCheck) {
      //     return res.status(400).send({
      //       msg: "Password should have at least 1 UpperCase, 1 Lowercase, 1 Number, 1 Special Character",
      //     });
      //   }
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          return res
            .status(404)
            .send({ msg: "Something wrong in password, Please re-enter" });
        } else {
          const newUser = new UserModel({
            name,
            email,
            password: hash,
            avatar,
            created_at,
            updated_at,
          });
          await newUser.save();
          return res
            .status(201)
            .send({ msg: "A new user has been registered" });
        }
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "Something went wrong, Please try again" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ msg: "Please register youself first." });
    } else {
      bcrypt.compare(password, userExist.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: userExist._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
          res.status(201).send({ msg: "Login Successfull", token: token });
        } else {
          res.status(201).send({ msg: "Invalid Credentials" });
        }
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "Something went wrong,Please try again" });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at ${process.env.PORT}`);
});
