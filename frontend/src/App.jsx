import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [mode, setMode] = useState("chat");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [promptResult, setPromptResult] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        message: userMessage
      });

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.reply
        }
      ]);
    } catch {
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "AI had an existential crisis 😭"
        }
      ]);
    }

    setLoading(false);
  };

  const generatePrompt = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    setLoading(true);

    try {
      const res = await axios.post("/api/vision", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setPromptResult(res.data.reply);
    } catch {
      setPromptResult("Prompt generation failed 😭");
    }

    setLoading(false);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptResult);
  };

  return (
    <div className="app">
      <h1>Omni AI 😼</h1>

      <div className="mode-switch">
        <button onClick={() => setMode("chat")}>Chat</button>
        <button onClick={() => setMode("vision")}>Image Prompt Maker</button>
      </div>

      {mode === "chat" && (
        <>
          <div className="chat-box">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-msg" : "ai-msg"}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="ai-msg">
                Summoning neurons... 🧠⚡
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}

      {mode === "vision" && (
        <div className="vision-box">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />

          <button onClick={generatePrompt}>
            Generate Prompt
          </button>

          {loading && <p>Analyzing image... 👁️</p>}

          {promptResult && (
            <div className="prompt-result">
              <ReactMarkdown>{promptResult}</ReactMarkdown>
              <button onClick={copyPrompt}>Copy Prompt</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;