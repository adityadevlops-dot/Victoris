"use client";

import { useState } from "react";

export default function CodeEditor(): JSX.Element {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex gap-2">
        <button className="px-3 py-1 bg-accent hover:bg-accent-dark text-white rounded-md text-sm transition-colors">
          Run
        </button>
        <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md text-sm transition-colors">
          Submit
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        className="flex-1 w-full bg-neutral-800 text-neutral-50 font-mono text-sm p-4 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
