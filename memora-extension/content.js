window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "SET_TOKEN") {
    console.log("✅ Token received in content script:", event.data.token);

    chrome.runtime.sendMessage({
      type: "SET_TOKEN",
      token: event.data.token
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("❌ Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("✅ Response from background:", response);
      }
    });
  }
});