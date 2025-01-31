import * as esbuild from "esbuild";
import { exec } from "pkg";

console.log("Building...");

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.js",
  platform: "node",
  target: ["node21"],
  sourcemap: true,
  loader: {
    ".node": "copy",
  },
});


if (process.argv.includes("--exe")) {
  console.log("Packaging...");
  exec(["dist/index.js", "--target", "latest", "--output", "dist/OsuZapZap.exe"])
}
console.log("Done!");