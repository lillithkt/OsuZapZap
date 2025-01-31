import * as esbuild from "esbuild";
import { exec } from "pkg";
(async () => {
  console.log("Building...");

  await esbuild.build({
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
    await exec(["dist/index.js", "--target", "latest", "--output", "dist/OsuZapZap.exe"])
  }
  console.log("Done!");
})();