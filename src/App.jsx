import { useState } from "react";
import Chatbot from "./Chatbot";
import { BsChatDots } from "react-icons/bs"; // Import chat icon
import "./App.css"
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <h1 className="text-center mt-3">Gemini Chatbot</h1>
      {isChatOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="btn btn-light" onClick={() => setIsChatOpen(false)}>✖</button>
          </div>
          <Chatbot />
        </div>
      )}

      {/* Floating Chat Button */}
      <button className="chat-btn" onClick={() => setIsChatOpen(true)}>
        <BsChatDots size={28} />
      </button>
    </div>
  );
}

export default App;
