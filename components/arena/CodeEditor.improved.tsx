'use client'

import { useState, useCallback, memo, Suspense, lazy, type ReactNode } from 'react'
import dynamic from 'next/dynamic'

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface CodeEditorProps {
  initialCode?: string
  language?: 'javascript' | 'python' | 'java' | 'cpp'
  readOnly?: boolean
  onCodeChange?: (code: string) => void
}

// ─── LOADING SKELETON ──────────────────────────────────────────────────────────

const EditorSkeleton = memo(function EditorSkeleton() {
  return (
    <div className="flex flex-col h-full bg-[#111111] rounded border border-[#1a1a1a] animate-pulse">
      <div className="h-12 bg-[#1a1a1a] border-b border-[#1a1a1a]" />
      <div className="flex-1 bg-[#0a0a0a]" />
    </div>
  )
})

// ─── FALLBACK SIMPLE EDITOR ───────────────────────────────────────────────────

const SimpleFallbackEditor = memo(function SimpleFallbackEditor({
  initialCode = '',
  readOnly = false,
  onCodeChange,
}: Omit<CodeEditorProps, 'language'>) {
  const [code, setCode] = useState(initialCode)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newCode = e.target.value
      setCode(newCode)
      onCodeChange?.(newCode)
    },
    [onCodeChange]
  )

  return (
    <div className="flex flex-col h-full bg-[#111111] rounded border border-[#1a1a1a] overflow-hidden">
      <div className="flex gap-2 p-3 bg-[#0f0f0f] border-b border-[#1a1a1a]">
        <button
          className="px-3 py-1 bg-[#dc2626] hover:bg-[#ef4444] text-white rounded text-sm transition-colors disabled:opacity-50"
          disabled={readOnly}
          aria-label="Run code"
        >
          Run
        </button>
        <button
          className="px-3 py-1 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded text-sm transition-colors disabled:opacity-50"
          disabled={readOnly}
          aria-label="Submit solution"
        >
          Submit
        </button>
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        readOnly={readOnly}
        placeholder="// Write your code here..."
        className="flex-1 w-full bg-[#0a0a0a] text-[#fafafa] font-mono text-sm p-4 resize-none focus:outline-none focus:ring-1 focus:ring-[#dc2626] border-0"
      />
    </div>
  )
})

// ─── MONACO EDITOR (LAZY LOADED) ───────────────────────────────────────────────

const MonacoEditor = lazy(() =>
  import('@monaco-editor/react').then(mod => ({
    default: mod.Editor,
  }))
)

// ─── MAIN CODE EDITOR COMPONENT ────────────────────────────────────────────────

const CodeEditor = memo(function CodeEditor({
  initialCode = '',
  language = 'javascript',
  readOnly = false,
  onCodeChange,
}: CodeEditorProps): ReactNode {
  const [isMonacoReady, setIsMonacoReady] = useState(false)

  const monacoOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: '"JetBrains Mono", monospace',
    theme: 'vs-dark',
    readOnly,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    lineNumbers: 'on' as const,
    glyphMargin: true,
    folding: true,
    renderWhitespace: 'none' as const,
    wordWrap: 'on' as const,
    wrappingIndent: 'indent' as const,
    padding: { top: 10, bottom: 10 },
    bracketPairColorization: {
      enabled: true,
    },
  }

  return (
    <div className="flex flex-col h-full bg-[#111111] rounded border border-[#1a1a1a] overflow-hidden">
      <div className="flex gap-2 p-3 bg-[#0f0f0f] border-b border-[#1a1a1a]">
        <button
          className="px-3 py-1 bg-[#dc2626] hover:bg-[#ef4444] text-white rounded text-sm font-medium transition-colors disabled:opacity-50"
          disabled={readOnly}
          aria-label="Run code"
        >
          ▶ Run
        </button>
        <button
          className="px-3 py-1 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded text-sm font-medium transition-colors disabled:opacity-50"
          disabled={readOnly}
          aria-label="Submit solution"
        >
          ✓ Submit
        </button>
        <span className="ml-auto text-[#a1a1aa] text-xs font-mono">
          {language.toUpperCase()}
        </span>
      </div>

      <div className="flex-1 overflow-hidden bg-[#0a0a0a]">
        <Suspense fallback={<EditorSkeleton />}>
          <MonacoEditor
            height="100%"
            language={language}
            value={initialCode}
            onChange={code => onCodeChange?.(code || '')}
            options={monacoOptions}
            theme="vs-dark"
            onMount={() => setIsMonacoReady(true)}
          />
        </Suspense>

        {!isMonacoReady && (
          <SimpleFallbackEditor
            initialCode={initialCode}
            readOnly={readOnly}
            onCodeChange={onCodeChange}
          />
        )}
      </div>
    </div>
  )
})

CodeEditor.displayName = 'CodeEditor'

export default CodeEditor
