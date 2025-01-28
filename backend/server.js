const express = require("express");
const cors = require("cors");
const sendSMS = require("./sendSMS.jsx");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send-sms", async (req, res) => {
  const { body, to } = req.body;
  try {
    const message = await sendSMS(body, to); // This should call the sendSMS function
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
