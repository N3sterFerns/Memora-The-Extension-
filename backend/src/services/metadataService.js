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

export const extractMetadata = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    const title =
      $("title").text() ||
      $('meta[property="og:title"]').attr("content") ||
      "";

    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      "";

    // 🔥 Strong image fallback chain
    let image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $("img").first().attr("src") ||
      "";

    // ✅ Fix relative URLs
    if (image && !image.startsWith("http")) {
      try {
        image = new URL(image, url).href;
      } catch {
        image = "";
      }
    }

    console.log("META:", { title, description, image });

    return { title, description, image };
  } catch (err) {
    console.error("SCRAPE ERROR:", err.message);
    return { title: "", description: "", image: "" };
  }
};