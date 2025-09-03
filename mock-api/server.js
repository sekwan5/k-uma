import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[MOCK] ${req.method} ${req.path}`);
  next();
});

const loadJson = (relPath) => {
  const fullPath = path.join(__dirname, relPath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", ts: Date.now() });
});

app.get("/api/test", (req, res) => {
  const data = loadJson("./data/testList.json");
  const total = Array.isArray(data) ? data.length : 0;

  const skipParam = Array.isArray(req.query.skip)
    ? req.query.skip[0]
    : req.query.skip;
  const limitParam = Array.isArray(req.query.limit)
    ? req.query.limit[0]
    : req.query.limit;

  const skip = Math.max(0, parseInt(String(skipParam ?? 0), 10) || 0);
  const limit = Math.max(0, parseInt(String(limitParam ?? 10), 10) || 10);

  const list = Array.isArray(data) ? data.slice(skip, skip + limit) : [];

  res.json({ list, count: total });
});

app.listen(PORT, () => {
  console.log(`[MOCK] server listening on http://localhost:${PORT}`);
});
