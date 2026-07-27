import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const root = process.cwd();
const ignored = new Set([".git", "node_modules"]);

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    if (ignored.has(name)) return [];
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function slug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function anchors(path) {
  const counts = new Map();
  const values = new Set();
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const base = slug(match[1]);
    const count = counts.get(base) ?? 0;
    values.add(count === 0 ? base : `${base}-${count}`);
    counts.set(base, count + 1);
  }
  return values;
}

const failures = [];
for (const file of walk(root).filter((path) => extname(path) === ".md")) {
  const content = readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
  const links = content.matchAll(/!?\[[^\]]*]\(([^)]+)\)/g);
  for (const [, raw] of links) {
    const value = raw.trim().replace(/^<|>$/g, "").split(/\s+["']/)[0];
    if (/^(https?:|mailto:)/.test(value) || value === "") continue;
    const [pathname, fragment] = value.split("#");
    const target = resolve(dirname(file), decodeURIComponent(pathname || ""));
    if (!existsSync(target)) {
      failures.push(`${relative(root, file)}: missing ${value}`);
      continue;
    }
    if (fragment && extname(target) === ".md" && !anchors(target).has(decodeURIComponent(fragment).toLowerCase())) {
      failures.push(`${relative(root, file)}: missing anchor #${fragment} in ${relative(root, target)}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("All local Markdown links and anchors are valid.");
