interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[], target: number) => {
  if (dailyExerciseHours.length === 0) throw new Error("Array cannot be empty");
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
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (err) {
  if (err instanceof Error) {
    console.log(err);
  } else {
    console.log("error");
  }
}
