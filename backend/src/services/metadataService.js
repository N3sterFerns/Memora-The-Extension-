// import axios from "axios";

// export const extractMetadata = async (url) => {
//   try {
//     if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       const videoId = url.split("v=")[1]?.split("&")[0];
//       if (videoId) {
//         return {
//           title: "YouTube Video",
//           description: "",
//           image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
//         };
//       }
//     }

//     const response = await axios.get("https://api.microlink.io", {
//       params: {
//         url: url,
//       },
//       timeout: 10000,
//     });

//     const meta = response.data.data;

//     const title = meta?.title || url;
//     const description = meta?.description || "";
//     const image =
//       meta?.image?.url ||
//       meta?.logo?.url || 
//       `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`;


//     return { title, description, image };
//   } catch (err) {
//     console.error("Microlink Error:", err.message);

//     return {
//       title: url,
//       description: "",
//       image: `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`,
//     };
//   }
// };


import axios from "axios";

export const extractMetadata = async (url) => {
  try {
    // 🎥 YouTube links — use YouTube API for accurate title
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId;

      if (url.includes("youtu.be")) {
        videoId = url.split("/").pop();
      } else {
        videoId = url.split("v=")[1]?.split("&")[0];
      }

      if (videoId) {
        try {
          const ytRes = await axios.get(
            "https://www.googleapis.com/youtube/v3/videos",
            {
              params: {
                id: videoId,
                key: process.env.YOUTUBE_API_KEY, // your API key
                part: "snippet",
              },
            }
          );

          const snippet = ytRes.data.items[0]?.snippet;

          return {
            title: snippet?.title || "YouTube Video",
            description: snippet?.description || "",
            image:
              snippet?.thumbnails?.high?.url ||
              `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          };
        } catch (ytErr) {
          console.error("YouTube API Error:", ytErr.message);
          // fallback to thumbnail
          return {
            title: "YouTube Video",
            description: "",
            image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          };
        }
      }
    }

    // 🌐 Everything else — use Microlink
    const response = await axios.get("https://api.microlink.io", {
      params: { url },
      timeout: 10000,
    });

    const meta = response.data.data;

    const title = meta?.title || url;
    const description = meta?.description || "";
    const image =
      meta?.image?.url ||
      meta?.logo?.url ||
      `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`;

    return { title, description, image };
  } catch (err) {
    console.error("Microlink Error:", err.message);

    return {
      title: url,
      description: "",
      image: `https://www.google.com/s2/favicons?sz=128&domain_url=${url}`,
    };
  }
};