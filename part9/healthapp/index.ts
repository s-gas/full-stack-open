import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const heightNumber = Number(height);
  const weightNumber = Number(weight);
  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  try {
    const bmi = calculateBmi(heightNumber, weightNumber);
    res.json({
      weight,
      height,
      bmi
    })
  } catch (_err) {
    res.status(400).json({ error: "malformatted parameters" })
  }
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening at :${PORT}`)
})
