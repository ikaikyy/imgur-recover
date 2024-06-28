import { parse } from "node-html-parser";

import type { Content } from "@/lib/scraper";

export function buildResultHTMLFromContent(content: Content): Blob {
  const resultHTML = parse(
    "<html><head></head><body><div id='root-container'></div></body></html>",
  );
  const resultHTMLRootContainer = resultHTML.querySelector("#root-container");
  const resultHTMLHead = resultHTML.querySelector("head");

  resultHTMLHead?.appendChild(parse(`<title>${content.title}</title>`));
  resultHTMLRootContainer?.appendChild(parse(`<h2>${content.title}</h2>`));

  content.mediaContainers.forEach((mediaContainer, index) => {
    const { mediaSource, description } = mediaContainer;

    resultHTMLRootContainer?.appendChild(
      parse(
        `<div class='image-container'><div class='image'><img src="${mediaSource}" alt="image ${index + 1}"></div><div class='description'><p>${description}</p></div></div>`,
      ),
    );
  });

  resultHTMLHead?.appendChild(parse(`<style>${content.styles}</style>`));

  return new Blob([resultHTML.toString()], { type: "text/html" });
}
