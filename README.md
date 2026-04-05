🧠 Memora — Your Smart Second Brain

<p align="center"> <b>Save. Understand. Connect. Rediscover.</b><br/> Turn scattered information into a structured, intelligent knowledge system. </p>
<p align="center"> <img src="https://img.shields.io/badge/Frontend-React-blue" /> <img src="https://img.shields.io/badge/Backend-Node.js-green" /> <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen" /> <img src="https://img.shields.io/badge/AI-Mistral-orange" /> <img src="https://img.shields.io/badge/VectorDB-Pinecone-purple" /> <img src="https://img.shields.io/badge/Status-Active-success" /> </p>
🚀 Overview

Memora is an AI-powered knowledge management system that acts like your second brain.

Instead of saving content and forgetting it, Memora:

👉 Understands what you save
👉 Connects related ideas
👉 Helps you rediscover knowledge at the right time

✨ Features
📌 Core Functionality
🔗 One-click Save (Chrome Extension)
🧾 Automatic Metadata Extraction (Title, description, image)
🏷️ AI Tagging (Mistral AI)
🧠 Intelligence Layer
🔍 Semantic Search (Vector-based)
🎯 AI Similarity Detection
🔗 Related Content Suggestions
⏳ Memory System
🔁 Time-Based Resurfacing
7 days
30 days
90 days
🎯 Relevance-Based Resurfacing (In Progress)
📊 Visualization
🧠 Graph Visualization (D3.js)
See how your ideas connect
Discover hidden relationships
🏗️ Tech Stack
Layer	Technology
Frontend	React, Redux Toolkit, SCSS
Backend	Node.js, Express
Database	MongoDB
AI	Mistral (Tags + Embeddings)
Vector DB	Pinecone
Visualization	D3.js
Extension	Chrome Extension (Manifest v3)
🧠 System Architecture
User → Chrome Extension → Backend API → MongoDB
                                      ↓
                                 Pinecone (Vector DB)
                                      ↓
                               Mistral AI Processing
                                      ↓
                               Frontend Dashboard
⚙️ How It Works
📥 User saves content via extension
🧠 Metadata is extracted
🤖 AI generates tags + embeddings
💾 Stored in MongoDB + Pinecone
🔍 Enables:
semantic search
similarity detection
related items
resurfacing
📸 Screenshots

(Add your screenshots here)

Dashboard
Graph Visualization
Chrome Extension UI
🛠️ Installation
1. Clone Repository
git clone https://github.com/your-username/memora.git
cd memora
2. Backend Setup
cd backend
npm install

Create .env file:

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
MISTRAL_API_KEY=your_key
PINECONE_API_KEY=your_key
YOUTUBE_API_KEY=your_key

Run backend:

npm run dev
3. Frontend Setup
cd frontend
npm install
npm run dev
4. Chrome Extension Setup
Open chrome://extensions/
Enable Developer Mode
Click Load Unpacked
Select the /extension folder
🔐 Authentication
JWT-based authentication
Stored in:
Cookies (Frontend)
Chrome Storage (Extension)
⚡ Key Highlights
🚀 Real-time saving via browser extension
🧠 AI-powered understanding (not just storage)
🔗 Knowledge graph visualization
🎯 Meaning-based similarity detection
⏳ Smart resurfacing of old knowledge
🧠 Future Roadmap
🔥 Advanced clustering system
📌 Highlight & annotation system
🧩 Knowledge insights dashboard
⚡ Redis caching for performance
📱 Mobile app
🌐 Public sharing & collaboration
🤝 Contributing

Contributions are welcome!

Fork the repo
Create a new branch
Commit your changes
Open a Pull Request
📜 License

MIT License

💬 Feedback

If you find this project useful or interesting:

⭐ Star the repo
💬 Share feedback
🚀 Connect with me

🎯 Vision

Memora is not just a bookmarking tool.

👉 It’s a system designed to:

Reduce information overload
Connect ideas automatically
Help you think better
