chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log("Message received:", request);

    if (request.type === "SET_TOKEN") {
      chrome.storage.local.set({ token: request.token }, () => {
        console.log("Token saved:", request.token);

        sendResponse({ status: "success" }); 
      });

      return true; 
    }
  }
);