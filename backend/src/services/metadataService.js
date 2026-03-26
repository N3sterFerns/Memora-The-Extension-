import axios from "axios";
import * as cheerio from "cheerio";

export const extractMetadata = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $("title").text();
    const description =
      $('meta[name="description"]').attr("content") || "";
    const image =
      $('meta[property="og:image"]').attr("content") || "";

    return { title, description, image };
  } catch (err) { 
    return { title: "", description: "", image: "" };
  }
};