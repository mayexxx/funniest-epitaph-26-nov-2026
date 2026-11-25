import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const text = "Here lies someone who swore they didn't need to write down the password because they'd definitely remember it.";
if (text.length < 1 || text.length > 150 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be a single line of 1 to 150 characters");
}

mkdirSync("/output", { recursive: true });
const expected = Buffer.from(text + "\n", "utf8");
writeFileSync("/output/entry.txt", expected);
if (!readFileSync("/output/entry.txt").equals(expected)) {
  throw new Error("Written entry does not match the expected bytes");
}
