interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): { target: number, dailyExercises: number[] } => {
  if (args.length < 4) throw new Error("usage: node exerciseCalculator <target> <dailyExercises[0]> <dailyExercises[1]> ...");
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("target must be a number");
  let dailyExercises: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const entry = Number(args[i]);
    if (isNaN(entry)) throw new Error("daily exercises must be numbers");
    dailyExercises.push(entry);
  }
  return {
    target,
    dailyExercises,
  }
}

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce((tot, cur) => cur ? tot + 1 : tot, 0);
  const average = dailyExerciseHours.reduce((tot, cur) => tot + cur, 0) / periodLength;
  const success = average >= target ? true : false;
  const rating = average < 1 ? 1 : average < 2 ? 2 : 3;
  const ratingDescription = rating === 1 ? "bad" : rating === 2 ? "decent" : "good";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, dailyExercises } = parseArguments(process.argv)
  console.log(calculateExercises(dailyExercises, target));
} catch (err) {
  if (err instanceof Error) {
    console.log(err);
  } else {
    console.log("error");
  }
}

export { }
