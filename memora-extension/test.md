{
  "manifest_version": 3,
  "name": "Second Brain Saver",
  "version": "1.0",
  "description": "Save anything to your smart brain",
  "permissions": ["activeTab", "storage"],
  "background": {
    "service_worker": "background.js"
  },
  "externally_connectable": {
    // "matches": ["https://memora-wine.vercel.app/*"] 
    "matches": ["http://localhost:5173/*"] 
  },
  "action": {
    "default_popup": "popup.html"
  }
}