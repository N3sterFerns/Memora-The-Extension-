// import axios from "axios";
// import * as cheerio from "cheerio";

// export const extractMetadata = async (url) => {
//   try {
//     const { data } = await axios.get(url, {
//       headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
//       },
//     });
//     const $ = cheerio.load(data);

//     const title = $("title").text();
//     const description = $('meta[name="description"]').attr("content") || "";
//     const image = $('meta[property="og:image"]').attr("content") || "";

//     return { title, description, image };
//   } catch (err) {
//     return { title: "", description: "", image: "" };
//   }
// };

import axios from "axios";
import * as cheerio from "cheerio";

// ⏱ delay helper
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// 🔁 retry logic for 429
const fetchWithRetry = async (url, retries = 3) => {
  try {
    await delay(Math.random() * 2000); // random delay

    return await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Connection: "keep-alive",
      },
      timeout: 10000,
    });
  } catch (err) {
    if (err.response?.status === 429 && retries > 0) {
      console.log("⚠️ Rate limited. Retrying...");
      await delay(2000);
      return fetchWithRetry(url, retries - 1);
    }
    throw err;
  }
};

export const extractMetadata = async (url) => {
  try {
    // 🎥 Special case: YouTube thumbnail
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      if (videoId) {
        return {
          title: "YouTube Video",
          description: "",
          image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        };
      }
    }

    const { data } = await fetchWithRetry(url);

    const $ = cheerio.load(data);

    const title =
      $("title").text() ||
      $('meta[property="og:title"]').attr("content") ||
      url;

    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      "";

    // 🖼 image extraction with fallbacks
    let image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $("img").first().attr("src") ||
      "";

    // 🔧 fix relative URLs
    if (image && !image.startsWith("http")) {
      try {
        image = new URL(image, url).href;
      } catch {
        image = "";
      }
    }

    // 🛟 fallback if still no image
    if (!image) {
      image = `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`;
    }

    console.log("✅ META:", { title, description, image });

    return { title, description, image };
  } catch (err) {
    console.error("❌ SCRAPE ERROR:", err.message);

    // 🛟 final fallback (NEVER return empty)
    return {
      title: url,
      description: "",
      image: `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`,
    };
  }
};