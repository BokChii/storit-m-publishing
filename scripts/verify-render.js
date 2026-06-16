const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scriptSources = [...indexHtml.matchAll(/<script\s+src="([^"]+)"/g)].map((match) => match[1]);

function localAssetPath(source) {
  return source.replace(/[?#].*$/, "");
}

const appNode = { innerHTML: "", scrollTop: 0 };
const modalNode = { innerHTML: "" };

global.window = {
  location: { hash: "" },
  addEventListener() {},
};

global.document = {
  head: {
    appendChild() {},
  },
  getElementById(id) {
    if (id === "app") return appNode;
    if (id === "modal-root") return modalNode;
    return { innerHTML: "", scrollTop: 0 };
  },
  querySelector() {
    return null;
  },
  createElement() {
    return {
      dataset: {},
      rel: "",
      href: "",
    };
  },
  addEventListener() {},
};

for (const source of scriptSources) {
  const file = path.join(root, localAssetPath(source));
  const code = fs.readFileSync(file, "utf8");
  vm.runInThisContext(code, { filename: source });
}

if (!window.StoritScreens) {
  throw new Error("window.StoritScreens was not registered");
}

const names = window.StoritScreens.names();
const failures = [];
const runtimeFiles = [
  "index.html",
  ...scriptSources.map((source) => localAssetPath(source).replace(/^\.\//, "")),
  ...[...indexHtml.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g)].map((match) =>
    localAssetPath(match[1]).replace(/^\.\//, ""),
  ),
];

for (const file of runtimeFiles) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) {
    failures.push(`${file}: referenced file does not exist`);
    continue;
  }
  const code = fs.readFileSync(absolute, "utf8");
  if (/assets\/screens|figma-overrides|figma-screen/.test(code)) {
    failures.push(`${file}: forbidden full-screen reference found`);
  }
}

for (const name of names) {
  try {
    const html = window.StoritScreens.render(name);
    if (typeof html !== "string" || html.length < 20) {
      failures.push(`${name}: empty render`);
    }
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

if (names.length < 40) {
  failures.push(`expected at least 40 screens, received ${names.length}`);
}

if (failures.length > 0) {
  console.error(JSON.stringify({ count: names.length, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ count: names.length, failures }, null, 2));
