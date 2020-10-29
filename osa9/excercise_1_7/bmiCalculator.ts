type Category =
  | "Very severely underweight"
  | "Severely underweight"
  | "Underweight"
  | "Normal (healthy weight)"
  | "Overweight"
  | "Obese Class I (Moderately obese)"
  | "Obese Class II (Severely obese)"
  | "Obese Class III (Very severely obese)"
  | "No description";

export const bmiCalculator = (height: number, mass: number): Category => {
  let result = mass / (height * 0.01) ** 2;
  if (result <= 15) {
    return "Very severely underweight";
  } else if (result >= 15 && result <= 16) {
    return "Severely underweight";
  } else if (result >= 16 && result <= 18.5) {
    return "Underweight";
  } else if (result >= 18.5 && result <= 25) {
    return "Normal (healthy weight)";
  } else if (result >= 25 && result <= 30) {
    return "Overweight";
  } else if (result >= 30 && result <= 35) {
    return "Obese Class I (Moderately obese)";
  } else if (result >= 35 && result <= 40) {
    return "Obese Class II (Severely obese)";
  } else if (result >= 40) {
    return "Obese Class III (Very severely obese)";
  } else {
    return "No description";
  }
};

interface inputValues {
  height: number;
  mass: number;
}

const parseArguments2 = (args: string[]): inputValues => {
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Given arguments are not numbers");
  }
  return {
    height: Number(args[2]),
    mass: Number(args[3]),
  };
};

try {
  let measures = parseArguments2(process.argv);
  console.log(bmiCalculator(measures.height, measures.mass));
} catch (error) {
  console.log("ERROR with message ", error.message);
}
