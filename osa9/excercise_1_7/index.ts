import express from "express";
import { bmiCalculator } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  let height: number = Number(req.query.height);
  let weight: number = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    res.send({
      height: height,
      weight: weight,
      bmi: bmiCalculator(height, weight),
    });
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
