interface ExcerciseAnalysis {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: ratingDescription;
  target: number;
  average: number;
}

type ratingDescription = "Excellent" | "Good" | "OK" | "Out of expression";

interface InputValues {
  target: number;
  hours: number[];
}

const parseArguments = (args: Array<string>): InputValues => {
  let target = 0;
  const hours: number[] = [];

  for (let i = 2; i < args.length; i++) {
    const value = Number(args[i]);

    if (isNaN(value)) {
      throw new Error(`Given argument ${args[i]} not a number!`);
    } else if (i === 2) {
      target = value;
    } else {
      hours.push(value);
    }
  }

  return {
    target: target,
    hours: hours,
  };
};

const calculateExcercises = (
  target: number,
  hours: number[]
): ExcerciseAnalysis => {
  const sumAverage: number =
    hours.length > 0
      ? hours.reduce((sum, hour) => sum + hour, 0) / hours.length
      : 0;

  const rating = getRating(target, sumAverage);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength: hours.length,
    trainingDays: hours.length,
    success: target <= sumAverage,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: sumAverage,
  };
};

const getRating = (target: number, sumAverage: number): number => {
  const diff: number = sumAverage - target;
  if (diff > 1) {
    return 3;
  } else if (diff >= 0 && diff <= 1) {
    return 2;
  } else if (diff < 0) {
    return 1;
  } else {
    return 0;
  }
};

const getRatingDescription = (rating: number): ratingDescription => {
  switch (rating) {
    case 3:
      return "Excellent";
    case 2:
      return "Good";
    case 1:
      return "OK";
    default:
      return "Out of expression";
  }
};

try {
  const parsedArguments = parseArguments(process.argv);
  console.log(
    calculateExcercises(parsedArguments.target, parsedArguments.hours)
  );
} catch (error) {
  const message = String(error.message);
  console.log(`Something happened: ${message}`);
}
