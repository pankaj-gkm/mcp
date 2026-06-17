'use client'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#aa3bff] mb-4 tracking-widest uppercase">
            The thesis
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            AI coding quality is bottlenecked by{' '}
            <span className="text-[#aa3bff]">context</span>,
            <br />
            not capability.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Give Claude a Jam recording — video, console logs, network requests, user events —
            and it diagnoses bugs with surgical precision instead of guessing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Without Jam */}
          <div className="rounded-xl border border-[#222] bg-[#111] p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-red-500/70"></span>
              <span className="text-sm font-medium text-gray-400">Without Jam</span>
            </div>
            <div className="space-y-2 mb-5">
              <div className="text-xs text-gray-600 mb-3">Context Claude receives:</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-700 font-mono">✗</span> Screenshot (no history)
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-700 font-mono">✗</span> Pasted error (truncated)
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-700 font-mono">✗</span> "It broke when I clicked"
              </div>
            </div>
            <div className="rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] p-4">
              <div className="text-xs text-gray-700 mb-2">Claude responds:</div>
              <p className="text-sm text-gray-500 italic leading-relaxed">
                "The error suggests a null reference. Could you check your error handler and verify
                the data is being fetched correctly? Also, ensure the API endpoint returns the expected
                format..."
              </p>
            </div>
          </div>

          {/* With Jam */}
          <div className="rounded-xl border border-[#aa3bff]/25 bg-[#111] p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#aa3bff]/[0.03] pointer-events-none" />
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#aa3bff]"></span>
              <span className="text-sm font-medium text-[#aa3bff]">With Jam</span>
            </div>
            <div className="space-y-2 mb-5">
              <div className="text-xs text-gray-600 mb-3">Context Claude receives:</div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-[#aa3bff] font-mono">✓</span> Full session video
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-[#aa3bff] font-mono">✓</span> All console logs (errors + warnings)
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-[#aa3bff] font-mono">✓</span> Every network request + response
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-[#aa3bff] font-mono">✓</span> Timestamped user events
              </div>
            </div>
            <div className="rounded-lg bg-[#0a0a0a] border border-[#aa3bff]/15 p-4">
              <div className="text-xs text-[#aa3bff]/50 mb-2">Claude responds:</div>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-white">Root cause found:</strong> Line 23 uses{' '}
                <code className="text-[#aa3bff] font-mono text-xs">parseInt()</code> instead of{' '}
                <code className="text-[#aa3bff] font-mono text-xs">parseFloat()</code>, truncating
                decimal amounts. Network log shows{' '}
                <code className="text-[#aa3bff] font-mono text-xs">POST /api/expenses</code> returning
                500 — missing DB config. Two bugs, both fixable in minutes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#demo"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-400 transition-colors"
          >
            Try the live demo below
            <span className="animate-bounce inline-block">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
