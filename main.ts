import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const text = "Here lies someone who swore they didn't need to write down the password because they'd definitely remember it.";
const characterCount = [...text].length;
if (characterCount < 1 || characterCount > 150 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be a single line of 1 to 150 characters");
}

const outputPath = fileURLToPath(new URL("/output/entry.txt", import.meta.url));
const expected = Buffer.from(text + "\n", "utf8");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, expected);
if (!(await readFile(outputPath)).equals(expected)) {
  throw new Error("Written entry does not match the expected text");
}
