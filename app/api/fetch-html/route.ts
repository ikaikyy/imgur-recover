import { fetchHTMLFile, parseHTMLFileText } from "@/lib/scraper";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  if (!searchParams.has("url")) {
    return new Response("URL not provided", {
      status: 400,
    });
  }
  const html = await fetchHTMLFile(searchParams.get("url")!);
  const content = parseHTMLFileText(html);

  return NextResponse.json(content);
}
