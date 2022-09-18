const Product = require("../models/Product");
const data = require("./data");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Product(data.products);
  console.log("::::::::Product" + newProduct);
  try {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    // res.send({ createdProducts});
    res.status(200).json(createdProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
