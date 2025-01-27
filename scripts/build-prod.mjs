import fs from "fs";
import path from "path";
import * as esbuild from "esbuild";
import ejs from "ejs";
import crypto from "crypto";

// Clear dist folder
try {
  fs.rmSync("dist", { recursive: true, force: true });
  fs.cpSync("static", "dist", { recursive: true });
} catch (error) {
  console.error(error);
}

const sources = {};
const cssConfig = {
  entryPoints: ["src/css/index.css"],
  bundle: true,
  minify: true,
  sourcemap: "external",
  write: false,
  loader: { ".webp": "dataurl" },
  outfile: "dist/bundle.[hash].css",
};
const jsConfig = {
  entryPoints: ["src/js/index.js"],
  bundle: true,
  minify: true,
  sourcemap: "external",
  write: false,
  outfile: "dist/bundle.[hash].js",
};

async function buildFromConfig(config, ext) {
  const results = await esbuild.build(config);

  for (const file of results.outputFiles) {
    const hash = crypto.createHash("sha256");
    hash.update(file.text);
    const hashDigest = hash.digest("hex").slice(0, 8);
    const digested = file.path.replace("[hash]", hashDigest);

    if (digested.endsWith(ext)) {
      sources[ext.slice(1)] = path.basename(digested);
    }

    fs.writeFileSync(digested, file.text);
  }
}

await buildFromConfig(jsConfig, ".js");
await buildFromConfig(cssConfig, ".css");

// Build HTML
ejs.renderFile("views/index.ejs", { sources }, (err, str) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.writeFileSync("dist/index.html", str);
});

ejs.renderFile("views/privacy.ejs", { sources }, (err, str) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.mkdirSync("dist/privacy", { recursive: true });
  fs.writeFileSync("dist/privacy/index.html", str);
});
