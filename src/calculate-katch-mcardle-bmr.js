import isNumber from 'is-number';

function isPositiveNumber(num) {
  return isNumber(num) && num > 0;
}

function positiveNumberErrorMessage(parameter) {
  return `The Katch-McArdle formula requires ${parameter} to be a positive number.`;
}

export default function calculateKatchMcArdleBmr({
  weight,
  bodyFatPercentage,
  useImperial = true
} = {}) {
  if (!isPositiveNumber(weight)) {
    throw new Error(positiveNumberErrorMessage('weight'));
  }
  if (!isPositiveNumber(bodyFatPercentage)) {
    throw new Error(positiveNumberErrorMessage('body fat percentage'));
  }
  if (bodyFatPercentage > 100) {
    throw new Error(`The body fat percentage can't be greater than 100.`);
  }

  let base = 370;
  let leanMultiplier = 21.6;

  // If the body fat is greater than 1, adjust to a decimal value.
  if (bodyFatPercentage > 1) {
    bodyFatPercentage = bodyFatPercentage / 100;
  }

  let weightInKg = useImperial ? weight * 0.453592 : weight;
  let bodyFatMass = weightInKg * bodyFatPercentage;
  let leanMass = weightInKg - bodyFatMass;
  return base + leanMultiplier * leanMass;
}
