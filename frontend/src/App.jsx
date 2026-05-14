import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [mode, setMode] = useState("chat");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");

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

  const generateImage = async () => {
  if (!imagePrompt.trim()) return;

  setLoading(true);

  try {
    const res = await axios.post("/api/image", {
      prompt: imagePrompt
    });

    console.log(res.data.imageUrl);
    setGeneratedImage(res.data.imageUrl);
  } catch {
    alert("Image generation failed 😭");
  }

  setLoading(false);
};

const downloadImage = async () => {
  if (!generatedImage) return;

  try {
    const response = await fetch(generatedImage);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `omni-ai-${Date.now()}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch {
    alert("Download failed 😭");
  }
};

  return (
    <div className="app">
      <h1>Omni AI 😼</h1>

      <div className="mode-switch">
        <button onClick={() => setMode("chat")}>Chat</button>
        <button onClick={() => setMode("vision")}>Image Prompt Maker</button>
        <button onClick={() => setMode("image")}>Text to Image</button>
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

      {mode === "image" && (
  <div className="vision-box">
    <input
      type="text"
      placeholder="Enter image prompt..."
      value={imagePrompt}
      onChange={(e) => setImagePrompt(e.target.value)}
    />

    <button onClick={generateImage}>
      Generate Image
    </button>

    {loading && <p>Painting pixels... 🎨</p>}

    {generatedImage && (
  <div className="image-preview">
    <img
      src={generatedImage}
      alt="Generated"
      className="generated-image"
      onError={() => {
    alert("Image provider had a meltdown 😭");
      }}
    />
    <button onClick={downloadImage}>
      Download Image
    </button>
  </div>
)}
  </div>
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

