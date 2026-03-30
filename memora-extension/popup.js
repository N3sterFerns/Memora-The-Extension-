const saveBtn = document.getElementById("saveBtn");
const statusDiv = document.getElementById("status");
const dashboardContainer = document.getElementById("dashboardContainer");
const openDashboardBtn = document.getElementById("openDashboard");

const pageTitleDiv = document.getElementById("pageTitle");
const pageUrlDiv = document.getElementById("pageUrl");

const confirmationDiv = document.getElementById("confirmation");
const confirmYesBtn = document.getElementById("confirmYes");
const confirmNoBtn = document.getElementById("confirmNo");

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
  chrome.tabs.create({ url: "http://localhost:5173/dashboard" });
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
      const checkRes = await fetch("http://localhost:4000/api/save/check-existing", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url }),
      });
      const checkData = await checkRes.json();

      if (checkData.exists) {
        showStatus("Already saved earlier", "info");
        pageTitleDiv.textContent = checkData.item.title;
        pageUrlDiv.textContent = "You saved this before";
        pageTitleDiv.parentElement.style.display = "block";
        setLoading(false);
        return;
      }

      const similarRes = await fetch("http://localhost:4000/api/save/check-similar-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, url }),
      });
      const similarData = await similarRes.json();

      if (similarData.isSimilar) {
        const {title} = similarData.matches;
        showStatus("Similar items found", "info");
        pageTitleDiv.innerHTML = `
          <strong>You saved similar content:</strong><br/>
          ${title}
        `;
        pageUrlDiv.textContent = "You may already have this knowledge";
        pageTitleDiv.parentElement.style.display = "block";

        confirmationDiv.classList.remove("hidden");

        const userConfirmed = await new Promise((resolve) => {
          confirmYesBtn.onclick = () => resolve(true);
          confirmNoBtn.onclick = () => resolve(false);
        });

        confirmationDiv.classList.add("hidden"); 
        if (!userConfirmed) {
          showStatus("Save cancelled", "info");
          setLoading(false);
          return; 
        }
      }

      const res = await fetch("http://localhost:4000/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url, title }),
      });

      if (res.ok) {
        showStatus("Saved successfully ✓", "success");
        dashboardContainer.classList.remove("hidden");

        pageTitleDiv.textContent = title;
        pageUrlDiv.textContent = url;

        pageTitleDiv.parentElement.style.display = "block";

        setTimeout(() => {
          pageTitleDiv.parentElement.style.display = "none";
        }, 30000);
      } else {
        showStatus("Failed to save", "error");
      }

    } catch (err) {
      console.error(err);
      showStatus("Network error", "error");
    } finally {
      setLoading(false);
    }
  });
});