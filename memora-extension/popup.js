const saveBtn = document.getElementById("saveBtn");
const statusDiv = document.getElementById("status");
const dashboardContainer = document.getElementById("dashboardContainer");
const openDashboardBtn = document.getElementById("openDashboard");

let isSaving = false;

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
}

function setLoading(isLoading) {
  saveBtn.disabled = isLoading;
  saveBtn.classList.toggle("loading", isLoading);
  isSaving = isLoading;
}

// Open dashboard
openDashboardBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:3000" }); // change to prod later
});

saveBtn.addEventListener("click", async () => {
  if (isSaving) return;
  setLoading(true);
  showStatus("Saving...", "info");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const url = tab.url;
  const title = tab.title;

  chrome.storage.local.get(["token"], async (result) => {
    const token = result.token;

    if (!token) {
      showStatus("Please login first", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url, title }),
      });

      if (res.ok) {
        showStatus("Saved successfully ✓", "success");

        dashboardContainer.classList.remove("hidden");
      } else {
        showStatus("Failed to save", "error");
      }
    } catch {
      showStatus("Network error", "error");
    }finally{
        setLoading(false);
    }

  });
});
