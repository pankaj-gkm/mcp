'use client'

import { useState } from 'react'

function buildPrompt(jamUrl: string) {
  return `Analyze this Jam bug recording and identify all issues: ${jamUrl}

Use the Jam tools to gather:
1. Console logs — look for JavaScript errors, warnings, or unexpected values
2. Network requests — identify failed HTTP calls, wrong status codes, or unexpected responses
3. User events — understand the sequence of actions that triggered the bug

Then provide a structured analysis:
- **Bugs Found**: Each bug with its symptom and user impact
- **Root Causes**: The underlying code issues causing each bug
- **Fix Recommendations**: Specific code changes to resolve each issue`
}

export default function JamAnalyzerSection() {
  const [jamUrl, setJamUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const prompt = jamUrl.trim() ? buildPrompt(jamUrl) : ''
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="analyze" className="py-24 px-6 border-t border-[#222]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#aa3bff] mb-2 tracking-widest uppercase">
            Step 2
          </p>
          <h2 className="text-3xl font-bold mb-3">Analyze with Claude</h2>
          <p className="text-gray-400 max-w-2xl">
            Paste your Jam recording URL. Claude will call the Jam MCP tools to read console logs,
            network requests, and user events — then diagnose the root cause.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: setup + input */}
          <div className="space-y-4">
            <div className="rounded-xl border border-[#222] bg-[#111] p-5">
              <h3 className="text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                One-time setup
              </h3>
              <ol className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-3">
                  <span className="text-[#aa3bff] font-mono text-xs mt-0.5 shrink-0">1.</span>
                  Open{' '}
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#aa3bff] hover:underline"
                  >
                    claude.ai
                  </a>{' '}
                  → Settings → Integrations
                </li>
                <li className="flex gap-3">
                  <span className="text-[#aa3bff] font-mono text-xs mt-0.5 shrink-0">2.</span>
                  Add MCP server:{' '}
                  <code className="text-[#aa3bff] font-mono text-xs">https://mcp.jam.dev/mcp</code>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#aa3bff] font-mono text-xs mt-0.5 shrink-0">3.</span>
                  Authenticate with your Jam account
                </li>
              </ol>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Jam Recording URL</label>
              <input
                type="url"
                placeholder="https://jam.dev/c/..."
                value={jamUrl}
                onChange={e => setJamUrl(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#aa3bff]/40 transition-colors"
              />
            </div>

            <div className="flex gap-2">
              <a
                href={claudeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!jamUrl.trim()}
                className={`flex-1 py-2.5 text-center bg-[#aa3bff] text-white text-sm rounded-lg font-medium hover:bg-[#9932ee] transition-colors ${
                  !jamUrl.trim() ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                Open in Claude ↗
              </a>
              <button
                onClick={copyPrompt}
                disabled={!jamUrl.trim()}
                className="px-4 py-2.5 border border-[#333] text-sm rounded-lg text-gray-400 hover:border-[#aa3bff]/40 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copied ? 'Copied!' : 'Copy prompt'}
              </button>
            </div>
          </div>

          {/* Right: prompt preview */}
          <div className="rounded-xl border border-[#222] bg-[#111] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#222]">
              <span className="text-xs font-medium text-gray-500">Prompt preview</span>
            </div>
            <div className="px-5 py-4 min-h-[200px]">
              {prompt ? (
                <p className="text-xs text-gray-500 font-mono leading-relaxed whitespace-pre-wrap">
                  {prompt}
                </p>
              ) : (
                <p className="text-sm text-gray-700 text-center py-10">
                  Paste a Jam URL to preview the prompt
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
