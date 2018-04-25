export const weightConversionFactors = {
  to: {
    // to get X to grams from...
    'g': (grams) => Number(grams),
    'oz': (grams) => Number(grams) * 28.3495231,
    'lbs': (grams) => Number(grams) * 453.59237,
    'kg': (grams) => Number(grams) * 1000,
    'st': (grams) => Number(grams) * 6350.29318,
  },
  from: {
    // to get X from grams into...
    'g': (grams) => Number(grams),
    'oz': (grams) => Number(grams) / 28.3495231,
    'lbs': (grams) => Number(grams) / 453.59237,
    'kg': (grams) => Number(grams) / 1000,
    'st': (grams) => Number(grams) / 6350.29318,
  },
};

export const temperatureConversionFactors = {
  to: {
    // to get X to celsius from...
    '°C': (celsius) => Number(celsius),
    '°F': (celsius) => (Number(celsius) - 32) * (5 / 9),
    'K': (celsius) => Number(celsius) + 273.15,
  },
  from: {
    // to get X from celsius into...
    '°C': (celsius) => Number(celsius),
    '°F': (celsius) => Number(celsius) * 1.8 + 32,
    'K': (celsius) => Number(celsius) - 273.15,
  }
}
