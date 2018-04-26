const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY;

const ConversionFactors = {
    weight: {
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
            'oz.': (grams) => Number(grams) / 28.3495,
            'lbs': (grams) => Number(grams) / 453.5924,
            'kg': (grams) => Number(grams) / 1000,
            'st.': (grams) => Number(grams) / 6350.2932,
        },
    },

    temperature: {
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
        },
    },

    distance: {
        to: {
            // to get X to meters from...
            'm': (m) => Number(m),
            'mm': (m) => Number(m) / 1000,
            'cm': (m) => Number(m) / 100,
            'km': (m) => Number(m) * 1000,
            'in.': (m) => Number(m) / 39.3701,
            'ft.': (m) => Number(m) / 3.2808,
            'yd.': (m) => Number(m) / 1.0936,
            'mi.': (m) => Number(m) * 1609.344,
        },
        from: {
            // to get X from meters into...
            'm': (m) => Number(m),
            'mm': (m) => Number(m) * 1000,
            'cm': (m) => Number(m) * 100,
            'km': (m) => Number(m) / 1000,
            'in.': (m) => Number(m) * 39.3701,
            'ft.': (m) => Number(m) * 3.2808,
            'yd.': (m) => Number(m) * 1.0936,
            'mi.': (m) => Number(m) / 1609.344,
        },
    },

    area: {
        to: {
            // to get X to cm^2 from...
            'm²': (m) => Number(m),
            'mm²': (m) => Number(m) / 1000000,
            'cm²': (m) => Number(m) / 10000,
            'km²': (m) => Number(m) * 1000000,
            'in².': (m) => Number(m) / 1550.0031,
            'ft².': (m) => Number(m) / 10.7639,
            'yd².': (m) => Number(m) / 1.196,
            'mi².': (m) => Number(m) * 2589988.11,
            'hect.': (m) => Number(m) * 10000,
            'acre': (m) => Number(m) * 4046.8564,
        },
        from: {
            // to get cm^2 from meters into...
            'm²': (m) => Number(m),
            'mm²': (m) => Number(m) * 1000000,
            'cm²': (m) => Number(m) * 10000,
            'km²': (m) => Number(m) / 1000000,
            'in².': (m) => Number(m) * 1550.0031,
            'ft².': (m) => Number(m) * 10.7639,
            'yd².': (m) => Number(m) * 1.196,
            'mi².': (m) => Number(m) / 2589988.11,
            'hect.': (m) => Number(m) / 10000,
            'acre': (m) => Number(m) / 4046.8564,
        },
    },

    volume: {
        to: {
            // to get X to m^3 from...
            'm³': (m) => Number(m),
            'cc': (m) => Number(m) / 1000000,
            'cm³': (m) => Number(m) / 1000000,
            'cup.': (m) => Number(m) / 4226.7528,
            'fl. oz.': (m) => Number(m) / 33814.0227,
            'ft³.': (m) => Number(m) / 35.3147,
            'gal': (m) => Number(m) / 264.172052,
            'in³.': (m) => Number(m) / 61023.7441,
            'km³': (m) => Number(m) * 1000000000,
            'liter': (m) => Number(m) / 1000,
            'mi³.': (m) => Number(m) * 4.16818183e9,
            'ml': (m) => Number(m) / 1000000,
            'mm³': (m) => Number(m) / 1000000000,
            'pint': (m) => Number(m) / 2113.3764,
            'quart': (m) => Number(m) / 1056.6882,
            'tbsp.': (m) => Number(m) / 67628.0454,
            'tsp.': (m) => Number(m) / 202884.136,
            'yd³.': (m) => Number(m) / 1.308,
        },
        from: {
            // to get X from m^3 into...
            'm³': (m) => Number(m),
            'cc': (m) => Number(m) * 1000000,
            'cm³': (m) => Number(m) * 1000000,
            'cup.': (m) => Number(m) * 4226.7528,
            'fl. oz.': (m) => Number(m) * 33814.0227,
            'ft³.': (m) => Number(m) * 35.3147,
            'gal': (m) => Number(m) * 264.172052,
            'in³.': (m) => Number(m) * 61023.7441,
            'km³': (m) => Number(m) / 1000000000,
            'liter': (m) => Number(m) * 1000,
            'mi³.': (m) => Number(m) / 4.16818183e9,
            'ml': (m) => Number(m) * 1000000,
            'mm³': (m) => Number(m) * 1000000000,
            'pint': (m) => Number(m) * 2113.3764,
            'quart': (m) => Number(m) * 1056.6882,
            'tbsp.': (m) => Number(m) * 67628.0454,
            'tsp.': (m) => Number(m) * 202884.136,
            'yd³.': (m) => Number(m) * 1.308,
        },
    },

    flowRate: {
        // cm,
        to: {
            // to get X to m^3/min from...
            // 'm³/s': (m) => Number(m) * SECONDS_IN_MINUTE,
            // 'm³/min': (m) => Number(m),
            // 'm³/hr': (m) => Number(m) / MINUTES_IN_HOUR,
            // 'm³/day': (m) => Number(m) / MINUTES_IN_DAY,
            'cm³/s': (m) => (Number(m) / 1000000) / SECONDS_IN_MINUTE,
            'cm³/min': (m) => (Number(m) / 1000000),
            'cm³/hr': (m) => (Number(m) / 1000000) / MINUTES_IN_HOUR,
            'cm³/day': (m) => (Number(m) / 1000000) / MINUTES_IN_DAY,
            'm³/s': (m) => Number(m) * SECONDS_IN_MINUTE,
            'm³/min': (m) => Number(m),
            'm³/hr': (m) => Number(m) / MINUTES_IN_HOUR,
            'm³/day': (m) => Number(m) / MINUTES_IN_DAY,
            'gal/s': (m) => (Number(m) / 264.172052) * SECONDS_IN_MINUTE,
            'gal/min (gpm)': (m) => (Number(m) / 264.172052),
            'gal/hr': (m) => (Number(m) / 264.172052) / MINUTES_IN_HOUR,
            'gal/day': (m) => (Number(m) / 264.172052) / MINUTES_IN_DAY,
            'in³/s': (m) => (Number(m) / 61023.7441) * SECONDS_IN_MINUTE,
            'in³/min': (m) => (Number(m) / 61023.7441),
            'in³/hr': (m) => (Number(m) / 61023.7441) / MINUTES_IN_HOUR,
            'in³/day': (m) => (Number(m) / 61023.7441) / MINUTES_IN_DAY,
            'liters/s': (m) => (Number(m) / 1000) * SECONDS_IN_MINUTE,
            'liters/min': (m) => (Number(m) / 1000),
            'liters/hr': (m) => (Number(m) / 1000) / MINUTES_IN_HOUR,
            'liters/day': (m) => (Number(m) / 1000) / MINUTES_IN_DAY,
        },
        from: {
            // to get X from m^3/min into...
            'cm³/s': (m) => (Number(m) * 1000000) / SECONDS_IN_MINUTE,
            'cm³/min': (m) => (Number(m) * 1000000),
            'cm³/hr': (m) => (Number(m) * 1000000) * MINUTES_IN_HOUR,
            'cm³/day': (m) => (Number(m) * 1000000) * MINUTES_IN_DAY,
            'm³/s': (m) => Number(m) / SECONDS_IN_MINUTE,
            'm³/min': (m) => Number(m),
            'm³/hr': (m) => Number(m) * MINUTES_IN_HOUR,
            'm³/day': (m) => Number(m) * MINUTES_IN_DAY,
            'gal/s': (m) => (Number(m) * 264.172052) / SECONDS_IN_MINUTE,
            'gal/min (gpm)': (m) => (Number(m) * 264.172052),
            'gal/hr': (m) => (Number(m) * 264.172052) * MINUTES_IN_HOUR,
            'gal/day': (m) => (Number(m) * 264.172052) * MINUTES_IN_DAY,
            'in³/s': (m) => (Number(m) * 61023.7441) / SECONDS_IN_MINUTE,
            'in³/min': (m) => (Number(m) * 61023.7441),
            'in³/hr': (m) => (Number(m) * 61023.7441) * MINUTES_IN_HOUR,
            'in³/day': (m) => (Number(m) * 61023.7441) * MINUTES_IN_DAY,
            'liters/s': (m) => (Number(m) * 1000) / SECONDS_IN_MINUTE,
            'liters/min': (m) => (Number(m) * 1000),
            'liters/hr': (m) => (Number(m) * 1000) * MINUTES_IN_HOUR,
            'liters/day': (m) => (Number(m) * 1000) * MINUTES_IN_DAY,
        },
    },
};

export default ConversionFactors;
