import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchAIResponse = async (inputText) => {
    try {
      const apiKey = "AIzaSyA04Sp2UHFBvEu-HqWU7Z7ZVf0CPvzfZZ4";
      if (!apiKey) throw new Error("API Key is missing.");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(inputText);
      const responseText = await result.response.text();

      return responseText;
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const botResponse = await fetchAIResponse(input);
      const botMessage = { text: botResponse, sender: "bot" };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error fetching response.", sender: "bot" }]);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="card shadow-lg mt-4 p-3" style={{ width: "100%", maxWidth: "500px" }}>
        <h5 className="card-title text-center mb-3">Chatbot</h5>
        <div className="card-body">
          <div className="chat-box border rounded p-2 mb-3" style={{ height: "400px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded text-white w-auto ${msg.sender === "user" ? "bg-primary align-self-end text-end" : "bg-secondary text-start"}`}
                style={{ maxWidth: "75%" }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="form-control"
            />
            <button onClick={handleSend} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
