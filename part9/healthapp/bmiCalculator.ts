const calculateBmi = (height: number, weight: number): string => {
  if (!height || !weight) throw new Error("arguments cannot be zero")
  const heightMeter = height / 100;
  const bmi = weight / (heightMeter * heightMeter);
  if (bmi < 16) return "Underweight (Severe thinness)";
  if (bmi < 17) return "Underweight (Moderate thinness)";
  if (bmi < 18.5) return "Underweight (Mild thinness)";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight (Pre-obese)";
  if (bmi < 35) return "Obese (Class I)";
  if (bmi < 40) return "Obese (Class II)";
  return "Obese (Class III)";
}

try {
  console.log(calculateBmi(187, 0));
} catch (err) {
  if (err instanceof Error) {
    console.log(err);
  } else {
    console.log("error")
  }
}
