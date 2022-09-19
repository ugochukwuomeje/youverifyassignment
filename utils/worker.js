const amp = require("amqplib/callback_api");
const { connection } = require("mongoose");

console.log(":::::::::::the order sent is: " + paymentDetails);
amp.connect("amqp://localhost", (connError, connection) => {
  if (connError) {
    throw connError;
  }

  //step 2: create channel
  connection.createChannel(async (channelError, channel) => {
    if (channelError) {
      throw channelError;
    }

    //step 3: assert Queue
    const QUEUE = "payment";
    channel.assertQueue(QUEUE);

    //STEP 4: send payment to queue

    channel.consume(QUEUE, (payment) => {
      console.log(`message received  ${QUEUE}`);

      try{
      const history = new History(payment);
      const savedHistory = await history.save();
      console.log(":::::history saved "+savedHistory)
      }catch(err){
          console.log(":::::the error is: "+err)
      }
    });
  });
});

module.exports = Payment;
