#!/usr/bin/env node

import { exit } from "node:process";
import { JSDOM } from "jsdom";
import serialize from "w3c-xmlserializer";
import { program } from "commander";
import { readFileSync, writeFileSync } from "node:fs";
import * as d3 from "d3";
import venn from "@upsetjs/venn.js";

// TODO: Inlining those values would be faster than read it every time
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { version, description } = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json")).toString()
);
// import pkg from "../package.json" assert { type: "json" };

const dom = new JSDOM(`<!DOCTYPE html><div id="venn"></div>`);
global.window = dom.window;
global.document = dom.window.document;

// CLI
program
  .description(description)
  .version(version)
  .option("-d, --destination <path>")
  .option("-s, --source <path>");
program.parse();

// TODO: https://github.com/upsetjs/venn.js/blob/dedb1185e932e67a5fee35f25cfe0d51be43fc39/src/index.d.ts#L173-L178
// options.symmetricalTextCentre
// options.colorScheme
// options.textFill
// width
// height
// padding
// distinct?
// fontSize
// round
// ...
// const defaults = {
//   data: [],
// };

const matches = program.opts();
let src = matches.source || "";
const dst = matches.destination || "";
const sourceRaw = JSON.parse(readFileSync(src === "" ? 0 : src, "utf-8"));
// const source = { ...defaults, ...sourceRaw };

const chart = venn.VennDiagram();
d3.select("#venn").datum(sourceRaw.data).call(chart);

const res = serialize(dom.window.document.querySelector("#venn svg"));

if (dst) {
  writeFileSync(dst, res);
} else {
  console.log(res);
}

exit(0);
