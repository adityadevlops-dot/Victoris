"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { useArenaStore } from "../../store/arenaStore";

export default function EditorPanel() {
  const monaco = useMonaco();
  const code = useArenaStore((state) => state.code);
  const language = useArenaStore((state) => state.language);
  const setCode = useArenaStore((state) => state.setCode);

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("victorisDark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "52525b", fontStyle: "italic" },
          { token: "keyword", foreground: "dc2626" },
          { token: "string", foreground: "22c55e" },
          { token: "number", foreground: "f59e0b" },
          { token: "type", foreground: "a1a1aa" },
        ],
        colors: {
          "editor.background": "#000000",
          "editor.foreground": "#fafafa",
          "editorLineNumber.foreground": "#52525b",
          "editorLineNumber.activeForeground": "#dc2626",
          "editor.selectionBackground": "#3f3f46",
          "editor.inactiveSelectionBackground": "#27272a",
          "editorCursor.foreground": "#dc2626",
          "editorIndentGuide.background": "#1a1a1a",
          "editorIndentGuide.activeBackground": "#dc262640",
          "editor.lineHighlightBackground": "#0f0f0f",
        },
      });
    }
  }, [monaco]);

  return (
    <div className="w-full h-full relative">
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme="victorisDark"
        value={code}
        onChange={(val) => setCode(val || "")}
        options={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
        loading={
          <div className="w-full h-full flex items-center justify-center text-[#52525b] font-['JetBrains_Mono'] text-xs tracking-widest uppercase">
            INITIALIZING_EDITOR...
          </div>
        }
      />
    </div>
  );
}
