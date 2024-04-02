import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, existsSync, readFileSync } from "node:fs";
import { vennSnap } from "../index.js";

const assertEqualFiles = async (file) => {
  const f1 = readFileSync("test/data/" + file).toString();
  const f2 = readFileSync("test/tmp/" + file).toString();
  assert.equal(f1, f2);
};

if (!existsSync("test/tmp")) mkdirSync("test/tmp");
if (!existsSync("test/diff")) mkdirSync("test/diff");

test("graph 1", async () => {
  await vennSnap("test/data/g1.json", "test/tmp/g1.svg");
  await assertEqualFiles("g1.svg");
});
