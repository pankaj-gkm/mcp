---
description: Fix a bug from a GitHub issue that contains a Jam recording link
argument-hint: <github-issue-url>
allowed-tools: Bash, Read, Edit, Write, Grep, Glob, mcp__jam__*
---

You are fixing a bug reported in a GitHub issue. The issue contains a written
bug description **and** a Jam recording link. Use BOTH the description and the
Jam recording (console logs, network requests, user events, video) to diagnose
and fix the root cause.

## Input

GitHub issue: `$1`

If `$1` is empty, ask the user for the issue URL and stop.

## Steps

1. **Read the issue.** Fetch it with the `gh` CLI so you get the full body and
   any comments:
   ```
   gh issue view $1 --comments --json number,title,body,url,comments
   ```
   Extract: the reported symptom, expected vs actual behavior, and the **Jam
   link** (a `https://jam.dev/c/...` URL in the body or comments).

2. **Watch the Jam recording.** Pass the Jam link to the Jam MCP tools
   (`mcp__jam__*`) to load the recording's context — console logs, network
   requests, user events, and metadata. If the Jam tools are not available,
   tell the user to run `/mcp` and authenticate the `jam` server, then stop.

3. **Diagnose.** Correlate what the recording shows (the failing action, the
   console error, the bad network response) with the issue description. State
   the root cause in one or two sentences before changing any code.

4. **Locate and fix.** Find the responsible code (Grep/Glob/Read) and apply the
   smallest correct fix at the root cause — not a symptom patch. Match the
   surrounding code style. Read `node_modules/next/dist/docs/` before touching
   Next.js APIs (see AGENTS.md — this Next.js has breaking changes).

5. **Verify.** Run `npm run lint` and `npm run build`. If the bug is reproducible
   without a browser, add or run a check that demonstrates the fix. Report
   results honestly — if something still fails, say so.

6. **Open a PR and link it to the issue.**
   - Create a branch: `fix/issue-<number>-<slug>`.
   - Commit with a message referencing the issue.
   - Push and open a PR whose body explains the root cause, the fix, and what
     the Jam recording revealed, ending with `Closes #<number>` (this links the
     PR to the issue's Development section and closes it on merge).
   - Use `gh pr create` and capture the returned PR URL.
   - **Link it back on the issue**: post a comment on the issue pointing to the
     PR so the link is visible immediately, not just on merge:
     ```
     gh issue comment <number> --repo <owner/repo> \
       --body "🔧 Fix opened in <pr-url> — root cause: <one line>. Closes on merge."
     ```
   - Report both the PR URL and confirm the issue was linked.

## Notes

- Do not invent a Jam link. If the issue has none, ask the user to add one.
- Keep the diff focused on the reported bug.
