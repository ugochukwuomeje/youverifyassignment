const amp = require("amqplib/callback_api");
const { connection } = require("mongoose");

const Payment = (order) => {
  let orderDetails = JSON.stringify(order);

  const paymentDetails = {
    customerId: order.customerId,
    productid: order.products[0].productId,
    orderId: order._id,
    amunt: order.amount,
  };

  console.log(
    ":::::::::::the order sent is: " + JSON.stringify(paymentDetails)
  );
  amp.connect("amqp://localhost", (connError, connection) => {
    if (connError) {
      throw connError;
    }

    //step 2: create channel
    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }

      //step 3: assert Queue
      const QUEUE = "payment";
      channel.assertQueue(QUEUE);

      //STEP 4: send payment to queue
      let paymentDetails = JSON.stringify(order);
      channel.sendToQueue(QUEUE, Buffer.from(paymentDetails));
      console.log(`message sent to ${QUEUE}`);
    });
  });
};

module.exports = Payment;
