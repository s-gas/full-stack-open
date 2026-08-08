const parseArguments = (args: string[]): { height: number, weight: number } => {
  if (args.length != 4) throw new Error("usage: node calculateBmi <height> <weight>");
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (isNaN(height) || isNaN(weight)) throw new Error("arguments must be numbers");
  return {
    height,
    weight
  }
}

export const calculateBmi = (height: number, weight: number): string => {
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
  const {height, weight} = parseArguments(process.argv)
  console.log(calculateBmi(height, weight));
} catch (err) {
  if (err instanceof Error) {
    console.log(err);
  } else {
    console.log("error")
  }
}
