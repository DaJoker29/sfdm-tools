import fs from "fs";
import * as esbuild from "esbuild";
import ejs from "ejs";

// Clear dist folder
try {
  fs.rmSync("dist", { recursive: true, force: true });
  fs.cpSync("static", "dist", { recursive: true });
} catch (error) {
  console.error(error);
}

const mode = process.env.NODE_ENV || "development";
const sources = {};
const cssConfig = {
  entryPoints: ["src/css/index.css"],
  bundle: true,
  loader: { ".webp": "dataurl" },
  outfile: "dist/bundle.css",
};
const jsConfig = {
  entryPoints: ["src/js/index.js"],
  bundle: true,
  outfile: "dist/bundle.js",
};

await esbuild.build(jsConfig);
await esbuild.build(cssConfig);

sources.css = "bundle.css";
sources.js = "bundle.js";

// Build HTML
ejs.renderFile("views/index.ejs", { mode, sources }, (err, str) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.writeFileSync("dist/index.html", str);
});

ejs.renderFile("views/privacy.ejs", { mode, sources }, (err, str) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.mkdirSync("dist/privacy", { recursive: true });
  fs.writeFileSync("dist/privacy/index.html", str);
});
