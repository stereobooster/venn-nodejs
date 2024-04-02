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

test("graph 1", async () => {
  await vennSnap("test/data/g1.json", "test/tmp/g1.svg");
  await assertEqualFiles("g1.svg");
});

test("lastfm", async () => {
  try {
    await vennSnap("test/data/lastfm.json", "test/tmp/lastfm.svg");
    await assertEqualFiles("lastfm.svg");
  } catch (e) {
    assert.match(e, /TypeError: tspan.getComputedTextLength is not a function/);
    assert.fail("TypeError: tspan.getComputedTextLength is not a function");
  }
});
