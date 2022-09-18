const Customer = require("../models/Customer");
const data = require("./data");

const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
  const newUser = new Customer(data.customers);
  console.log(newUser);
  try {
    await Customer.remove({});
    const createdCustomer = await Customer.insertMany(data.customers);
    res.send({ createdCustomer });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
