const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { customers } = require("./data");
const Payment = require("../utils/payment");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  console.log("::::::: new order is" + newOrder);

  ////////////check if customer exist
  let customerId = req.body.customerId;
  let productId = req.body.products[0].productId;

  const product = await Product.findById(productId);

  const customer = await Customer.findById(customerId);

  if (!customer) {
    res.status(400).json({ message: "customer not found" });
  } else if (!product) {
    res.status(400).json({ message: "product no longer exist" }); //////////////check if product exist
  }
  try {
    const savedOrder = await newOrder.save();
    console.log("Order has been save ");
    console.log("The send order is: " + Payment(newOrder));
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
