// Your Human in One Word — entry program.
// It writes exactly one word to the output file: the human who
// vanishes the moment a decision, an approval, or a reply is due.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PORTRAIT = "Ghoster";

function isOneWord(value: string): boolean {
  return /^[A-Za-z]+$/.test(value) && value.length >= 1 && value.length <= 30;
}

function run(): void {
  if (!isOneWord(PORTRAIT)) {
    throw new Error("entry must be one word of 1-30 letters");
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, PORTRAIT, "utf8");
  chmodSync(file, 0o644);
  // Read it back so a silent short write can never slip through.
  const written = readFileSync(file, "utf8");
  if (written !== PORTRAIT) {
    throw new Error(`entry.txt mismatch: expected ${PORTRAIT}, got ${written}`);
  }
  console.log(`entry written: ${PORTRAIT}`);
}

run();
