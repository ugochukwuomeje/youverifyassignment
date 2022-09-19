const amp = require("amqplib/callback_api");
const { connection } = require("mongoose");
const History = require("../models/History");

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

    channel.consume(
      QUEUE,
      async (payment) => {
        console.log("message received  " + payment.content);

        try {
          const history = new History(JSON.parse(payment.content));
          const savedHistory = await history.save();
          console.log(":::::history saved " + savedHistory);
        } catch (err) {
          console.log(":::::the error is: " + err);
        }
      },
      { noAck: true }
    );
  });
});
