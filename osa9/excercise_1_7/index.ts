import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExcercises } from "./excerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

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

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, hours } = req.body;
  res.send(calculateExcercises(target, hours));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
