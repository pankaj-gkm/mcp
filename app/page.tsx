import HeroSection from "./components/HeroSection"
import BugDemoSection from "./components/BugDemoSection"
import JamAnalyzerSection from "./components/JamAnalyzerSection"
import MCPToolsSection from "./components/MCPToolsSection"

export default function Home() {
  return (
    <main>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#222] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-tight">
            <span className="text-[#aa3bff]">JAM</span> × Claude
          </span>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#demo" className="hover:text-white transition-colors">Demo</a>
            <a href="#analyze" className="hover:text-white transition-colors">Analyzer</a>
            <a href="#tools" className="hover:text-white transition-colors">MCP Tools</a>
          </div>
        </div>
      </nav>
      <div className="pt-14">
        <HeroSection />
        <BugDemoSection />
        <JamAnalyzerSection />
        <MCPToolsSection />
      </div>
    </main>
  )
}
