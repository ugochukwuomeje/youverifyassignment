const amp = require("amqplib/callback_api");
const { connection } = require("mongoose");

const Payment = (order) => {
  try {
    let orderDetails = JSON.stringify(order);

    console.log(orderDetails);

    const ObjectpaymentDetails = {
      customerId: order.customerId,
      productid: order.products[0].productId,
      orderId: order._id,
      amount: order.amount,
    };

    let paymentDetails = JSON.stringify(ObjectpaymentDetails);

    console.log(":::::::::::the order sent is: " + paymentDetails);
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
        channel.sendToQueue(QUEUE, Buffer.from(paymentDetails));
        console.log(`message sent to ${QUEUE}`);
      });
    });
  } catch (err) {
    console.log("::::::::::the payment error: " + err);
  }
};

module.exports = Payment;
