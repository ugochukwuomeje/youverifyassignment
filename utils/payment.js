const amp = require("amqplib/callback_api");
const { connection } = require("mongoose");

const Payment = (order) => {
  let paymentDetails = JSON.stringify(order);

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
      let paymentDetails = JSON.stringify(order);
      channel.sendToQueue(QUEUE, Buffer.from(paymentDetails));
      console.log(`message sent to ${QUEUE}`);
    });
  });
};

module.exports = Payment;
