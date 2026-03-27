import axios from "axios";

export const extractMetadata = async (url) => {
  try {
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