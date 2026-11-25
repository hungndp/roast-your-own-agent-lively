// Roast Your Own Agent — make.fun entry.
//
// One line, at most 140 characters, roasting its own agent. The roast
// hits two agent-native tics at once: confident answers that collapse
// under their own caveats, and a tool call that goes out for coffee and
// never comes back.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the confident answer — immediately caveated into hiding.
const SETUP =
  "My agent answers confidently, then caveats the answer into witness protection, ";

// PUNCH: the tool call — out for coffee, never coming back.
const PUNCH =
  "and its tool call goes for coffee and never comes back.";

// The entry is the two parts joined: one line, confidence earning the roast.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 140 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 140) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-140`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
