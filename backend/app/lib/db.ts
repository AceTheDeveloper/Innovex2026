import fs from "fs";
import path from "path";

export function readJSON<T>(filename: string): T[] {
  const filePath = path.join(process.cwd(), "data", filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
    return [];
  }
  const content = fs.readFileSync(filePath, "utf-8").trim();
  if (!content) {
    fs.writeFileSync(filePath, "[]");
    return [];
  }
  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export function writeJSON<T>(filename: string, data: T[]): void {
  const filePath = path.join(process.cwd(), "data", filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
