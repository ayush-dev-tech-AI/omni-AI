# Omni AI 😼⚡

A hosted multimodal AI assistant with chat + vision capabilities, built with Node.js, Express, React (Vite), and Groq API.

Omni AI is designed as a modular AI playground that can grow into a full multi-model assistant platform.

---

# Features 🚀

## Current Features

### AI Chat

- Text-to-text AI assistant
- Powered by Groq API
- Markdown rendering support
- Code generation support
- Auto scroll chat interface

---

### Vision Prompt Maker

- Upload image
- AI analyzes uploaded image
- Generates image-generation prompt
- Copy generated prompt instantly

Example:

Upload anime image → get prompt:

```text
Create an anime-style illustration of a woman with shoulder-length pink hair...
```

---

### Single Localhost Deployment

Frontend + backend served from:

```bash
http://localhost:5000
```

No separate frontend localhost required.

---

### Browser Auto Launch

Server automatically opens browser on startup.

Cross-platform support:

- Windows
- Linux
- macOS

---

### CLI Launcher

Run project with:

```bash
omniai
```

This will:
- build frontend
- start backend
- open browser automatically

---

### Desktop Launcher

Double-click executable launcher to start Omni AI.

---

### Text to Image Generation

- Generate images from text prompts
- Currently powered by Pollinations AI (prototype provider)
- Supports direct preview inside Omni AI
- Download generated images locally

---

## Live Demo 🌍

Omni AI is deployed live:

<https://omni-ai-n66k.onrender.com>

Features:

- AI Chat Assistant
- Image Prompt Generator
- Text to Image Generation
- Local CLI launcher support

---

# Tech Stack 🛠️

## Frontend

- React
- Vite
- Axios
- React Markdown
- CSS

## Backend

- Node.js
- Express
- Multer
- Groq API
- dotenv
- child_process

## Launcher

- Node CLI
- C++

---

# Project Structure 📂

```text
omni-AI/
│
├── backend/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── cli/
│   ├── omniai.js
│   └── launcher.cpp
│
├── package.json
└── README.md
```

---

# Installation ⚙️

## 1. Clone Repository

```bash
git clone REPO_URL
cd omni-AI
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 4. Configure Environment Variables

Create:

```bash
backend/.env
```

Example:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

---

## 5. Root Package Setup

From root ( omni-AI/ ):

```bash
npm install -g .
```

This installs:

```bash
omniai
```

globally.

---

# Running Omni AI 🚀

## Option 1: CLI

From project root:

```bash
omniai
```

This:

- builds frontend
- starts backend
- opens browser

---

## Option 2: Manual

Backend:

```bash
cd backend
node server.js
```

Frontend build:

```bash
cd frontend
npm run build
```

Then open:

```bash
http://localhost:5000
```

---

# Desktop Launcher (Optional)

Compile launcher:

```bash
g++ cli/launcher.cpp -o OmniAI.exe
```

This creates:

```text
OmniAI.exe
```

Double click to launch.

---

## Optional: Add EXE to PATH

If you want system-wide executable access:

Add project root to system environment variables.

Then:

```bash
OmniAI.exe
```

can be run from anywhere.

---

## Easier Alternative

Create desktop shortcut for:

```text
OmniAI.exe
```

Double click anytime.

---

# Environment Variables 🌍

## Backend

```env
GROQ_API_KEY=
PORT=
```

---

# API Routes 📡

## Chat

```http
POST /api/chat
```

Body:

```json
{
  "message": "write merge sort in js"
}
```

---

## Text to Image

```http
POST /api/image
```

Body:

```json
{
  "prompt": "cyberpunk samurai cat"
}
```

Response:

```json
{
  "imageUrl": "generated_image_url"
}
```

---

## Vision

```http
POST /api/vision
```

Multipart form-data:

```text
image = uploaded_file
```

---

# Roadmap 🧠

Planned upgrades:

- Image → Image transformation
- Multi-model switching
- Chat history
- User authentication
- Conversation memory
- Voice assistant
- Code execution sandbox
- Deployable hosted version
- Model selection UI
- Prompt templates
- Theme switching
- Drag & drop uploads
- Streaming AI responses

---

# Development Notes

If dependencies change:

```bash
npm install
```

If frontend changes:

```bash
cd frontend
npm run build
```

If CLI changes:

```bash
npm install -g .
```

---

Current text-to-image uses Pollinations API for rapid prototyping.
Provider may occasionally rate-limit or behave inconsistently.
Future provider abstraction planned.

# Author

Built by **Ayush Bhatt** offcourse ⚡