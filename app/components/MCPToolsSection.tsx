const tools = [
  {
    name: 'getConsoleLogs',
    description:
      'Retrieves all console output from the recording — errors, warnings, info messages, and logged values with timestamps.',
    icon: '📋',
    category: 'Diagnostics',
  },
  {
    name: 'getNetworkRequests',
    description:
      'Returns every HTTP request made during the session, including status codes, request payloads, and full response bodies.',
    icon: '🌐',
    category: 'Network',
  },
  {
    name: 'getUserEvents',
    description:
      'Captures the full sequence of user interactions — clicks, inputs, scrolls — with timestamps and element targets.',
    icon: '👆',
    category: 'Interaction',
  },
  {
    name: 'getScreenshot',
    description:
      'Provides a screenshot of the recorded session at a specific moment, showing the visual state at time of failure.',
    icon: '📸',
    category: 'Visual',
  },
  {
    name: 'analyzeVideo',
    description:
      'Processes the full session video to understand what the user experienced visually, frame by frame.',
    icon: '🎬',
    category: 'Video',
  },
]

export default function MCPToolsSection() {
  return (
    <section id="tools" className="py-24 px-6 border-t border-[#222]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#aa3bff] mb-2 tracking-widest uppercase">
            MCP Reference
          </p>
          <h2 className="text-3xl font-bold mb-3">Jam MCP Tools</h2>
          <p className="text-gray-400 max-w-2xl">
            Jam exposes 5 tools via its MCP server at{' '}
            <code className="text-[#aa3bff] font-mono text-sm">https://mcp.jam.dev/mcp</code>.
            Claude calls these automatically when analyzing a recording.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {tools.map(tool => (
            <div
              key={tool.name}
              className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#aa3bff]/25 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{tool.icon}</span>
                <span className="text-xs text-[#aa3bff] font-medium px-2 py-0.5 rounded-full border border-[#aa3bff]/20 bg-[#aa3bff]/10">
                  {tool.category}
                </span>
              </div>
              <h3 className="font-mono text-sm font-semibold text-white mb-2">{tool.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-[#222] bg-[#111] p-5">
          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">
            MCP Server Connection
          </p>
          <pre className="text-xs text-[#aa3bff] font-mono overflow-x-auto leading-relaxed">
{`mcp_servers: [{
  type: 'url',
  url: 'https://mcp.jam.dev/mcp',
  name: 'jam',
  authorization_token: process.env.JAM_API_TOKEN,
}],
tools: [{
  type: 'mcp_toolset',
  mcp_server_name: 'jam',
}],
betas: ['mcp-client-2025-11-20']`}
          </pre>
        </div>
      </div>
    </section>
  )
}
