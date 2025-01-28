import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userNumber, setUserNumber] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const response = await axios.post("https://twilio-message-app-api.vercel.app", {
        body: messageContent,
        to: userNumber,
      });
      if (response.data.success) {
        setSuccessMessage("Message sent successfully!");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error); // Log the error
      setErrorMessage(
        "Failed to send message: " +
          (error.response ? error.response.data.error : error.message)
      );
      setSuccessMessage("");
    }

    // Clear the input fields after sending
    setUserNumber("");
    setMessageContent("");
  };

  return (
    <div className="App">
      <h1>Send a Message</h1>
      <div>
        <label>
          User Number:
          <input
            type="text"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Message Content:
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSendMessage}>Send Message</button>
      {successMessage && (
        <p style={{ textAlign: "center", color: "green" }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
      )}
    </div>
  );
}

export default App;
