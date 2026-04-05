🧠 Memora — Your Smart Second Brain
<p align="center"> <img src="https://via.placeholder.com/1200x300?text=Memora+-+Smart+Second+Brain" alt="Memora Banner" /> </p> <p align="center"> <b>Save. Understand. Connect. Rediscover.</b><br/> Transform scattered information into an intelligent knowledge system. </p>
<p align="center"> <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge"/> <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge"/> <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge"/> <img src="https://img.shields.io/badge/AI-Mistral-orange?style=for-the-badge"/> <img src="https://img.shields.io/badge/VectorDB-Pinecone-purple?style=for-the-badge"/> </p>
🚀 Overview

Memora is an AI-powered second brain that helps you capture, organize, and rediscover knowledge effortlessly.

Unlike traditional bookmarking tools, Memora doesn't just store links —
it understands, connects, and resurfaces information intelligently.

✨ Features
📌 Core Features
<ul> <li>🔗 <b>One-click Save</b> via Chrome Extension</li> <li>🧾 <b>Automatic Metadata Extraction</b> (title, description, image)</li> <li>🏷️ <b>AI Tagging</b> using Mistral AI</li> </ul>
🧠 Intelligence Layer
<ul> <li>🔍 <b>Semantic Search</b> (meaning-based search)</li> <li>🎯 <b>AI Similarity Detection</b></li> <li>🔗 <b>Related Content Suggestions</b></li> </ul>
⏳ Memory System
<ul> <li>🔁 <b>Time-Based Resurfacing</b> <ul> <li>7 days ago</li> <li>30 days ago</li> <li>90 days ago</li> </ul> </li> <li>🎯 <b>Relevance-Based Resurfacing</b> (In Progress)</li> </ul>
📊 Visualization
<ul> <li>🧠 <b>Graph Visualization (D3.js)</b></li> <li>🔗 Visual representation of connected ideas</li> </ul>
🏗️ Tech Stack
<table align="center"> <tr> <th>Layer</th> <th>Technology</th> </tr> <tr> <td>Frontend</td> <td>React, Redux Toolkit, SCSS</td> </tr> <tr> <td>Backend</td> <td>Node.js, Express</td> </tr> <tr> <td>Database</td> <td>MongoDB</td> </tr> <tr> <td>AI</td> <td>Mistral (Tags + Embeddings)</td> </tr> <tr> <td>Vector DB</td> <td>Pinecone</td> </tr> <tr> <td>Visualization</td> <td>D3.js</td> </tr> <tr> <td>Extension</td> <td>Chrome Extension (Manifest v3)</td> </tr> </table>
🧠 System Architecture
User → Chrome Extension → Backend API → MongoDB
                                      ↓
                                 Pinecone (Vector DB)
                                      ↓
                               Mistral AI Processing
                                      ↓
                               Frontend Dashboard
⚙️ How It Works
<ol> <li>📥 User saves content via extension</li> <li>🧠 Metadata is extracted</li> <li>🤖 AI generates tags + embeddings</li> <li>💾 Stored in MongoDB + Pinecone</li> <li>🔍 Enables smart features like: <ul> <li>Semantic search</li> <li>Similarity detection</li> <li>Related items</li> <li>Resurfacing</li> </ul> </li> </ol>
📸 Screenshots
<p align="center"> <i>Add your screenshots here (Dashboard, Graph, Extension UI)</i> </p>
🛠️ Installation
1️⃣ Clone Repository
git clone https://github.com/your-username/memora.git
cd memora
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
MISTRAL_API_KEY=your_key
PINECONE_API_KEY=your_key
YOUTUBE_API_KEY=your_key

Run:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
4️⃣ Chrome Extension Setup
<ol> <li>Go to <b>chrome://extensions/</b></li> <li>Enable <b>Developer Mode</b></li> <li>Click <b>Load Unpacked</b></li> <li>Select the <b>/extension</b> folder</li> </ol>
🔐 Authentication
<ul> <li>JWT-based authentication</li> <li>Stored in cookies (frontend)</li> <li>Stored in Chrome storage (extension)</li> </ul>
⚡ Key Highlights
<ul> <li>🚀 Real-time saving via extension</li> <li>🧠 AI-powered understanding</li> <li>🔗 Knowledge graph visualization</li> <li>🎯 Meaning-based similarity detection</li> <li>⏳ Smart resurfacing</li> </ul>
🧠 Future Roadmap
<ul> <li>🔥 Advanced clustering</li> <li>📌 Highlight & notes system</li> <li>🧩 Knowledge insights dashboard</li> <li>⚡ Redis caching</li> <li>📱 Mobile support</li> <li>🌐 Sharing & collaboration</li> </ul>
🤝 Contributing
<p> Contributions are welcome!<br/> Fork → Create Branch → Commit → Pull Request 🚀 </p>
📜 License

MIT License

💬 Feedback
<p align="center"> ⭐ Star the repo &nbsp;&nbsp;|&nbsp;&nbsp; 💬 Share feedback &nbsp;&nbsp;|&nbsp;&nbsp; 🚀 Connect with me </p>
🎯 Vision
<p align="center"> Memora is not just a bookmarking tool.<br/><br/> <b>It’s a system that helps you think better.</b> </p>
