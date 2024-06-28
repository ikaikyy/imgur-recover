"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  async function handleSubmit() {
    const response = await fetch(`/api/fetch-html?url=${url}`);
    const data = await response.json();
    console.log(data);
  }
  return (
    <main className="w-full h-full flex flex-col gap-4 items-center justify-center bg-zinc-800">
      <h1>Imgur Recover</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="web.archive.org/web/?/imgur.com/a/?"
        className="w-96 h-16 bg-zinc-900 rounded-full border-teal-600 border-2 p-4 text-md focus-visible:ring-teal-600 focus-visible:ring-2 focus-visible:outline-none"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-96 h-16 bg-zinc-900 rounded-full border-teal-600 border-2 p-4 text-lg hover:ring-teal-600 hover:ring-2 focus-visible:outline-none focus-visible:ring-teal-600 focus-visible:ring-2"
      >
        Submit
      </button>
      <iframe className="hidden"></iframe>
    </main>
  );
}
