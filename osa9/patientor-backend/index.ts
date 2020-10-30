import express from "express";
import cors from "cors";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

const root = "/api";

app.get(`${root}/ping`, (_req, res) => {
  res.send("PING!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
