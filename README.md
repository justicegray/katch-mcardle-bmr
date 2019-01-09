# katch-mcardle-bmr
Function for calculating basal metabolic rate the Katch-McArdle way. 
A companion package that calculates BMR using the Harris-Benedict method can be found at    
[harris-benedict-bmr](https://github.com/justicegray/harris-benedict-bmr).

## Installation
Install the package via `npm`:
```
npm install katch-mcardle-bmr --save
```

or `yarn`:
```
yarn add katch-mcardle-bmr
```

## Usage
Import:
```
import calculateKatchMcardleBmr from 'calculate-katch-mcardle-bmr';
```

The function signature itself is as follows:
```
calculateKatchMcArdleBmr({weight,
    bodyFatPercentage,
    useImperial = true})
```

`weight`: Weight in pounds or kilograms (see `useImperial` below).  The calculation will throw an error if weight is not a number above 0.

`bodyFatPercentage`: Percentage of body fat, which can be expressed either in integer form (e.g. `25`) or in decimal form (`0.25`).   The function will have equivalent output for either format (see the first unit test/spec under the 'formula' fixture).  The calculation will throw an error if bodyFatPercentage is not a number between 0 and 100; values between 0 and 1 are treated as a percentage in decimal form.

`useImperial`: When true (the default), assumes weight and height is in imperial measurement (pounds).  When false, assumes weight is in metric (kg).

## License

This package is under an [ISC license](./LICENSE).

## Contributing

This package has a suite of unit tests written in [Jest](https://jestjs.io).  Alterations or additions are expected to have unit tests present in the PR.  

[Prettier](https://prettier.io/) is used for code formatting and can be run using `npm run pretty` - please use it on any changes that would be made.
