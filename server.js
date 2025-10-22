import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.static(ROOT));

app.post("/api/save-data", async (req, res) => {
  try {
    const json = JSON.stringify(req.body, null, 2);
    const out = path.join(ROOT, "data", "data.json");
    await fs.writeFile(out, json, "utf8");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Projection ICM em http://localhost:${PORT}`));
