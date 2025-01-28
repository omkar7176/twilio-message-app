require("dotenv").config();
const twilio = require("twilio");

const accountid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountid, authToken);

const sendSMS = async (body, to) => {
  let msgOptions = {
    from: process.env.TWILIO_FROM_NUMBER,
    to,
    body,
  };
  try {
    const message = await client.messages.create(msgOptions);
    return message;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendSMS;
