import { parse } from "node-html-parser";
import fs from "fs";

export type Content = {
  title: string;
  mediaContainers: {
    mediaType: "image" | "video";
    mediaSource: string;
    description: string;
  }[];
  styles?: string;
};

export async function fetchHTMLFile(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("URL not available");
  }

  const html = await response.text();

  // Remove comments
  html.replace(/<!.*?>/g, "");

  return html;
}

export function parseHTMLFileText(html: string): Content {
  const root = parse(html);

  const content: Content = {} as Content;

  const postTitle = root.querySelector(".post-title")?.text;
  const postImageContainers = root.querySelectorAll(
    ".post-image-container:has(.post-image)",
  );

  content.title = postTitle || "No title found";

  content.mediaContainers = postImageContainers.map((container) => {
    let mediaType: "image" | "video" = "image";

    if (container.querySelector(".post-image .video-container video")) {
      mediaType = "video";
    }

    let mediaSource = "";

    switch (mediaType) {
      case "image":
        mediaSource = (
          container
            .querySelector("meta[itemprop='thumbnailUrl']")
            ?.getAttribute("content") || ""
        )
          .replace(/im_/, "if_")
          .replace(/h.jpg/, ".jpg");
        break;
      case "video":
        mediaSource = (
          container
            .querySelector("meta[itemprop='thumbnailUrl']")
            ?.getAttribute("content") || ""
        )
          .replace(/im_/, "if_")
          .replace(/h.jpg/, ".jpg");
        break;
    }

    const description =
      container.querySelector(".post-image-meta .post-image-description")
        ?.text || "";

    return { mediaType, mediaSource, description };
  });

  content.styles = fs.readFileSync("styles/result-html.css", "utf8");

  return content;
}
