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

export const extractMetadata = async (url) => {
  try {
    // 🎥 Handle YouTube separately (faster & reliable)
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

    // 🔥 Call Microlink API
    const response = await axios.get("https://api.microlink.io", {
      params: {
        url: url,
      },
      timeout: 10000,
    });

    const meta = response.data.data;

    const title = meta?.title || url;
    const description = meta?.description || "";
    const image =
      meta?.image?.url ||
      meta?.logo?.url || // fallback logo
      `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`;

    console.log("✅ META:", { title, description, image });

    return { title, description, image };
  } catch (err) {
    console.error("❌ Microlink Error:", err.message);

    // 🛟 fallback (never break UI)
    return {
      title: url,
      description: "",
      image: `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`,
    };
  }
};