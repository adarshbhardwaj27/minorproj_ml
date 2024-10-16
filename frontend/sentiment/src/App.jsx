import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to send the text to the Python backend for analysis
  const analyzeSentiment = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        text: text,
      });
      setSentimentResult(response.data);
    } catch (err) {
      setError("Error analyzing sentiment");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sentiment Analyzer</h1>

      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px" }}
      />

      <br />
      <button
        onClick={analyzeSentiment}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Analyze
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {sentimentResult && (
        <div style={{ marginTop: "20px" }}>
          <h2>Sentiment Score: {sentimentResult.score}</h2>
          <p>{sentimentResult.sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
