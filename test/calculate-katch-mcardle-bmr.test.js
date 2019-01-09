import calculateKatchMcArdleBmr from '../src/calculate-katch-mcardle-bmr';

describe('Calculation throws error', () => {
  test('if weight is not provided', () => {
    let bmrArgsWithoutWeight = {
      bodyFatPercentage: 25
    };

    expect(() => {
      calculateKatchMcArdleBmr(bmrArgsWithoutWeight);
    }).toThrow();
  });

  test('if body fat percentage is not provided', () => {
    let bmrArgsWithoutPercentage = {
      weight: 170
    };

    expect(() => {
      calculateKatchMcArdleBmr(bmrArgsWithoutPercentage);
    }).toThrow();
  });

  test('if body fat percentage is greater than 100%', () => {
    let bmrArgsWithRidiculousBodyFat = {
      weight: 170,
      bodyFatPercentage: 200
    };

    expect(() => {
      calculateKatchMcArdleBmr(bmrArgsWithRidiculousBodyFat);
    }).toThrow();
  });

  test('if weight is less than or equal to 0', () => {
    let bmrArgsWithoutWeight = {
      weight: -5,
      bodyFatPercentage: 25
    };

    expect(() => {
      calculateKatchMcArdleBmr(bmrArgsWithoutWeight);
    }).toThrow();
  });

  test('if body fat percentage is less than or equal to 0', () => {
    let bmrArgsWithoutHeight = {
      weight: 170,
      bodyFatPercentage: -20
    };

    expect(() => {
      calculateKatchMcArdleBmr(bmrArgsWithoutHeight);
    }).toThrow();
  });
});

describe('Calculation defaults', () => {
  test('to imperial measurements if no measurement is supplied', () => {
    let bmrArgsWithDefault = {
      weight: 175,
      bodyFatPercentage: 10
    };
    let bmrArgsWithImperialSpecified = {
      ...bmrArgsWithDefault,
      useImperial: true
    };
    let bmrArgsWithMetricSpecified = {
      ...bmrArgsWithDefault,
      useImperial: false
    };

    let bmrWithDefault = calculateKatchMcArdleBmr(bmrArgsWithDefault);
    let bmrWithImperialSpecified = calculateKatchMcArdleBmr(
      bmrArgsWithImperialSpecified
    );
    let bmrWithMetricSpecified = calculateKatchMcArdleBmr(
      bmrArgsWithMetricSpecified
    );
    expect(bmrWithDefault).toEqual(bmrWithImperialSpecified);
    expect(bmrWithDefault).not.toEqual(bmrWithMetricSpecified);
  });
});

describe('Formula', () => {
  test('Produces the same value for body fat percentages represented as 0.xx decimals and the equivalent integer version', () => {
    let bmrArgumentsWithDecimalPercentage = {
      weight: 170,
      useImperial: true,
      bodyFatPercentage: 0.25
    };

    let bmrArgumentsWithIntegerPercentage = {
      ...bmrArgumentsWithDecimalPercentage,
      bodyFatPercentage: 25
    };

    expect(calculateKatchMcArdleBmr(bmrArgumentsWithDecimalPercentage)).toEqual(
      calculateKatchMcArdleBmr(bmrArgumentsWithIntegerPercentage)
    );
  });

  // Metric: BMR = 370 + 21.6 * Lean Body Mass (in kg)
  test('produces the correct value using metric', () => {
    let bmrArgs = {
      weight: 100,
      bodyFatPercentage: 20,
      useImperial: false
    };
    let sampleBmr = 370 + 21.6 * 80;

    expect(calculateKatchMcArdleBmr(bmrArgs)).toEqual(sampleBmr);
  });

  test('produces the correct value using imperial', () => {
    let bmrArgs = {
      weight: 150,
      bodyFatPercentage: 20,
      useImperial: true
    };
    let sampleMaleBmr = 370 + 21.6 * 120 * 0.453592;
    expect(calculateKatchMcArdleBmr(bmrArgs)).toEqual(sampleMaleBmr);
  });
});
