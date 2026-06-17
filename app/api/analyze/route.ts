import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

type Block = { type: string; text?: string; thinking?: string };

export async function POST(request: Request) {
  try {
    const { jamUrl } = await request.json();

    if (!jamUrl) {
      return Response.json({ error: "jamUrl is required" }, { status: 400 });
    }

    if (!process.env.JAM_API_TOKEN) {
      return Response.json(
        { error: "JAM_API_TOKEN is not configured on the server" },
        { status: 500 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (client.beta.messages as any).create({
      model: "claude-opus-4-8",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      betas: ["mcp-client-2025-11-20"],
      mcp_servers: [
        {
          type: "url",
          url: "https://mcp.jam.dev/mcp",
          name: "jam",
          authorization_token: process.env.JAM_API_TOKEN,
        },
      ],
      tools: [
        {
          type: "mcp_toolset",
          mcp_server_name: "jam",
        },
      ],
      messages: [
        {
          role: "user",
          content: `Analyze this Jam bug recording and identify all issues: ${jamUrl}

Use the Jam tools to gather:
1. Console logs — look for JavaScript errors, warnings, or unexpected values
2. Network requests — identify failed HTTP calls, wrong status codes, or unexpected responses
3. User events — understand the sequence of actions that triggered the bug

Then provide a structured analysis:
- **Bugs Found**: Each bug with its symptom and user impact
- **Root Causes**: The underlying code issues causing each bug
- **Fix Recommendations**: Specific code changes to resolve each issue`,
        },
      ],
    });

    const blocks = response.content as Block[];

    const analysis = blocks
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("\n\n");

    const thinking = blocks
      .filter((b) => b.type === "thinking")
      .map((b) => b.thinking ?? "")
      .join("\n\n");

    return Response.json({ analysis, thinking });
  } catch (error) {
    console.error("Analyze error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 },
    );
  }
}
