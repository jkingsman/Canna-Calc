const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 31;

const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY;

const ConversionFactors = {
    basicWeight: {
        to: {
            // to get X to grams from...
            g: grams => Number(grams),
            oz: grams => Number(grams) * 28.3495231,
            mg: grams => Number(grams) / 1000,
            lbs: grams => Number(grams) * 453.59237,
        },
        from: {
            // to get X from grams into...
            g: grams => Number(grams),
            oz: grams => Number(grams) / 28.3495,
            mg: grams => Number(grams) * 1000,
            lbs: grams => Number(grams) / 453.59237,
        },
    },

    weight: {
        to: {
            // to get X to grams from...
            g: grams => Number(grams),
            mg: grams => Number(grams) / 1000,
            oz: grams => Number(grams) * 28.3495231,
            lbs: grams => Number(grams) * 453.59237,
            kg: grams => Number(grams) * 1000,
            st: grams => Number(grams) * 6350.29318,
        },
        from: {
            // to get X from grams into...
            g: grams => Number(grams),
            mg: grams => Number(grams) * 1000,
            oz: grams => Number(grams) / 28.3495,
            lbs: grams => Number(grams) / 453.5924,
            kg: grams => Number(grams) / 1000,
            st: grams => Number(grams) / 6350.2932,
        },
    },

    temperature: {
        to: {
            // to get X to celsius from...
            "°C": celsius => Number(celsius),
            "°F": celsius => (Number(celsius) - 32) * (5 / 9),
            K: celsius => Number(celsius) + 273.15,
        },
        from: {
            // to get X from celsius into...
            "°C": celsius => Number(celsius),
            "°F": celsius => Number(celsius) * 1.8 + 32,
            K: celsius => Number(celsius) - 273.15,
        },
    },

    speed: {
        to: {
            // to get X to m/s from...
            "m/s": ms => Number(ms),
            "ft/s": ms => Number(ms) * 0.3048,
            mph: ms => Number(ms) * 0.44704,
            kph: ms => Number(ms) * 0.2778,
        },
        from: {
            // to get X from m/s into...
            "m/s": ms => Number(ms),
            "ft/s": ms => Number(ms) / 0.3048,
            mph: ms => Number(ms) / 0.44704,
            kph: ms => Number(ms) / 0.2778,
        },
    },

    basicDistance: {
        to: {
            // to get X to ft from...
            ft: m => Number(m),
            m: m => Number(m) * 3.2808,
            yd: m => Number(m) * 3,
        },
        from: {
            // to get X from ft into...
            ft: m => Number(m),
            m: m => Number(m) / 3.2808,
            yd: m => Number(m) / 3,
        },
    },

    distance: {
        to: {
            // to get X to meters from...
            m: m => Number(m),
            mm: m => Number(m) / 1000,
            cm: m => Number(m) / 100,
            km: m => Number(m) * 1000,
            in: m => Number(m) / 39.3701,
            ft: m => Number(m) / 3.2808,
            yd: m => Number(m) / 1.0936,
            mi: m => Number(m) * 1609.344,
        },
        from: {
            // to get X from meters into...
            m: m => Number(m),
            mm: m => Number(m) * 1000,
            cm: m => Number(m) * 100,
            km: m => Number(m) / 1000,
            in: m => Number(m) * 39.3701,
            ft: m => Number(m) * 3.2808,
            yd: m => Number(m) * 1.0936,
            mi: m => Number(m) / 1609.344,
        },
    },

    basicArea: {
        to: {
            // to get X to ft^2 from...
            "ft²": m => Number(m),
            "m²": m => Number(m) * 10.7639104,
            "yd²": m => Number(m) * 9,
        },
        from: {
            // to get X from ft^2 into...
            "ft²": m => Number(m),
            "m²": m => Number(m) / 10.7639104,
            "yd²": m => Number(m) / 9,
        },
    },

    area: {
        to: {
            // to get X to m^2 from...
            "m²": m => Number(m),
            "mm²": m => Number(m) / 1000000,
            "cm²": m => Number(m) / 10000,
            "km²": m => Number(m) * 1000000,
            "in²": m => Number(m) / 1550.0031,
            "ft²": m => Number(m) / 10.7639,
            "yd²": m => Number(m) / 1.196,
            "mi²": m => Number(m) * 2589988.11,
            hect: m => Number(m) * 10000,
            acre: m => Number(m) * 4046.8564,
        },
        from: {
            // to get m^2 from meters into...
            "m²": m => Number(m),
            "mm²": m => Number(m) * 1000000,
            "cm²": m => Number(m) * 10000,
            "km²": m => Number(m) / 1000000,
            "in²": m => Number(m) * 1550.0031,
            "ft²": m => Number(m) * 10.7639,
            "yd²": m => Number(m) * 1.196,
            "mi²": m => Number(m) / 2589988.11,
            hect: m => Number(m) / 10000,
            acre: m => Number(m) / 4046.8564,
        },
    },

    basicVolume: {
        to: {
            // to get X to ft^3 from...
            "ft³": m => Number(m),
            "m³": m => Number(m) * 35.3147,
            gal: m => Number(m) * 0.133680556,
            "yd³": m => Number(m) * 27,
        },
        from: {
            // to get X from ft^3 into...
            "ft³": m => Number(m),
            "m³": m => Number(m) / 35.3147,
            gal: m => Number(m) / 0.133680556,
            "yd³": m => Number(m) / 27,
        },
    },

    cookingVolume: {
        to: {
            // to get X to cups from...
            cups: cups => Number(cups),
            tbsp: cups => Number(cups) / 16,
            tsp: cups => Number(cups) / 48,
            "fl. oz": cups => Number(cups) / 8,
            pint: cups => Number(cups) / 0.5,
            quart: cups => Number(cups) / 0.25,
        },
        from: {
            // to get X from cups into...
            cups: cups => Number(cups),
            tbsp: cups => Number(cups) * 16,
            tsp: cups => Number(cups) * 48,
            "fl. oz": cups => Number(cups) * 8,
            pint: cups => Number(cups) * 0.5,
            quart: cups => Number(cups) * 0.25,
        },
    },

    drinkVolume: {
        to: {
            // to get X to floz from...
            "fl. oz": m => Number(m),
            gal: m => Number(m) * 128,
            liter: m => Number(m) * 33.814,
            ml: m => Number(m) / 29.5735,
            pint: m => Number(m) / 473.176,
        },
        from: {
            // to get X from fl oz into...
            "fl. oz": m => Number(m),
            gal: m => Number(m) / 128,
            liter: m => Number(m) / 33.814,
            ml: m => Number(m) * 29.5735,
            pint: m => Number(m) * 473.176,
        },
    },

    volume: {
        to: {
            // to get X to m^3 from...
            "m³": m => Number(m),
            cc: m => Number(m) / 1000000,
            "cm³": m => Number(m) / 1000000,
            cups: m => Number(m) / 4226.7528,
            "fl. oz": m => Number(m) / 33814.0227,
            "ft³": m => Number(m) / 35.3147,
            gal: m => Number(m) / 264.172052,
            "in³": m => Number(m) / 61023.7441,
            "km³": m => Number(m) * 1000000000,
            liter: m => Number(m) / 1000,
            "mi³": m => Number(m) * 4.16818183e9,
            ml: m => Number(m) / 1000000,
            "mm³": m => Number(m) / 1000000000,
            pint: m => Number(m) / 2113.3764,
            quart: m => Number(m) / 1056.6882,
            tbsp: m => Number(m) / 67628.0454,
            tsp: m => Number(m) / 202884.136,
            "yd³": m => Number(m) / 1.308,
        },
        from: {
            // to get X from m^3 into...
            "m³": m => Number(m),
            cc: m => Number(m) * 1000000,
            "cm³": m => Number(m) * 1000000,
            cups: m => Number(m) * 4226.7528,
            "fl. oz": m => Number(m) * 33814.0227,
            "ft³": m => Number(m) * 35.3147,
            gal: m => Number(m) * 264.172052,
            "in³": m => Number(m) * 61023.7441,
            "km³": m => Number(m) / 1000000000,
            liter: m => Number(m) * 1000,
            "mi³": m => Number(m) / 4.16818183e9,
            ml: m => Number(m) * 1000000,
            "mm³": m => Number(m) * 1000000000,
            pint: m => Number(m) * 2113.3764,
            quart: m => Number(m) * 1056.6882,
            tbsp: m => Number(m) * 67628.0454,
            tsp: m => Number(m) * 202884.136,
            "yd³": m => Number(m) * 1.308,
        },
    },

    tinyVolume: {
        to: {
            // to get X to ml from...
            ml: m => Number(m),
            cc: m => Number(m),
            "cm³": m => Number(m),
            tbsp: m => Number(m) * 14.7867648,
            tsp: m => Number(m) / 4.92892159,
        },
        from: {
            // to get X from ml into...
            ml: m => Number(m),
            cc: m => Number(m),
            "cm³": m => Number(m),
            tbsp: m => Number(m) * 14.7867648,
            tsp: m => Number(m) / 4.92892159,
        },
    },

    flowRate: {
        // cm,
        to: {
            // to get X to m^3/min from...
            "m³/min": m => Number(m),
            "m³/s": m => Number(m) * SECONDS_IN_MINUTE,
            "m³/hr": m => Number(m) / MINUTES_IN_HOUR,
            "m³/day": m => Number(m) / MINUTES_IN_DAY,
            "cm³/s": m => Number(m) / 1000000 / SECONDS_IN_MINUTE,
            "cm³/min": m => Number(m) / 1000000,
            "cm³/hr": m => Number(m) / 1000000 / MINUTES_IN_HOUR,
            "cm³/day": m => Number(m) / 1000000 / MINUTES_IN_DAY,
            "gal/s": m => Number(m) / 264.172052 * SECONDS_IN_MINUTE,
            "gal/min (gpm)": m => Number(m) / 264.172052,
            "gal/hr": m => Number(m) / 264.172052 / MINUTES_IN_HOUR,
            "gal/day": m => Number(m) / 264.172052 / MINUTES_IN_DAY,
            "in³/s": m => Number(m) / 61023.7441 * SECONDS_IN_MINUTE,
            "in³/min": m => Number(m) / 61023.7441,
            "in³/hr": m => Number(m) / 61023.7441 / MINUTES_IN_HOUR,
            "in³/day": m => Number(m) / 61023.7441 / MINUTES_IN_DAY,
            "ft³/s": m => Number(m) / 35.3147 * SECONDS_IN_MINUTE,
            "ft³/min (SCFM)": m => Number(m) / 35.3147,
            "ft³/hr (SCFH)": m => Number(m) / 35.3147 / MINUTES_IN_HOUR,
            "ft³/day": m => Number(m) / 35.3147 / MINUTES_IN_DAY,
            "liters/s": m => Number(m) / 1000 * SECONDS_IN_MINUTE,
            "liters/min": m => Number(m) / 1000,
            "liters/hr": m => Number(m) / 1000 / MINUTES_IN_HOUR,
            "liters/day": m => Number(m) / 1000 / MINUTES_IN_DAY,
        },
        from: {
            // to get X from m^3/min into...
            "m³/min": m => Number(m),
            "m³/s": m => Number(m) / SECONDS_IN_MINUTE,
            "m³/hr": m => Number(m) * MINUTES_IN_HOUR,
            "m³/day": m => Number(m) * MINUTES_IN_DAY,
            "cm³/s": m => Number(m) * 1000000 / SECONDS_IN_MINUTE,
            "cm³/min": m => Number(m) * 1000000,
            "cm³/hr": m => Number(m) * 1000000 * MINUTES_IN_HOUR,
            "cm³/day": m => Number(m) * 1000000 * MINUTES_IN_DAY,
            "gal/s": m => Number(m) * 264.172052 / SECONDS_IN_MINUTE,
            "gal/min (gpm)": m => Number(m) * 264.172052,
            "gal/hr": m => Number(m) * 264.172052 * MINUTES_IN_HOUR,
            "gal/day": m => Number(m) * 264.172052 * MINUTES_IN_DAY,
            "in³/s": m => Number(m) * 61023.7441 / SECONDS_IN_MINUTE,
            "in³/min": m => Number(m) * 61023.7441,
            "in³/hr": m => Number(m) * 61023.7441 * MINUTES_IN_HOUR,
            "in³/day": m => Number(m) * 61023.7441 * MINUTES_IN_DAY,
            "ft³/s": m => Number(m) * 35.3147 * SECONDS_IN_MINUTE,
            "ft³/min (SCFM)": m => Number(m) * 35.3147,
            "ft³/hr (SCFH)": m => Number(m) * 35.3147 / MINUTES_IN_HOUR,
            "ft³/day": m => Number(m) * 35.3147 / MINUTES_IN_DAY,
            "liters/s": m => Number(m) * 1000 / SECONDS_IN_MINUTE,
            "liters/min": m => Number(m) * 1000,
            "liters/hr": m => Number(m) * 1000 * MINUTES_IN_HOUR,
            "liters/day": m => Number(m) * 1000 * MINUTES_IN_DAY,
        },
    },

    basicTime: {
        to: {
            // to get X to hours from...
            hours: hours => Number(hours),
            seconds: hours => Number(hours) / SECONDS_IN_MINUTE / MINUTES_IN_HOUR,
            minutes: hours => Number(hours) / MINUTES_IN_HOUR,
            days: hours => Number(hours) * HOURS_IN_DAY,
            weeks: hours => Number(hours) * DAYS_IN_WEEK * HOURS_IN_DAY,
            months: hours => Number(hours) * DAYS_IN_MONTH * HOURS_IN_DAY,
        },
        from: {
            // to get X from hours into...
            hours: hours => Number(hours),
            seconds: hours => Number(hours) * MINUTES_IN_HOUR * SECONDS_IN_MINUTE,
            minutes: hours => Number(hours) * MINUTES_IN_HOUR,
            days: hours => Number(hours) / HOURS_IN_DAY,
            weeks: hours => Number(hours) / HOURS_IN_DAY / DAYS_IN_WEEK,
            months: hours => Number(hours) / HOURS_IN_DAY / DAYS_IN_MONTH,
        },
    },

    conductivity: {
        to: {
            // to get X to EC (US) from...
            "EC (US)": ec => Number(ec),
            "EC (EU)": ec => Number(ec) / 0.78125,
            "EC (AUS)": ec => Number(ec) / 0.714285714,
            CF: ec => Number(ec) / 10,
            "PPM TDS": ec => Number(ec) / 500,
        },
        from: {
            // to get X from EC (US) into...
            "EC (US)": ec => Number(ec),
            "EC (EU)": ec => Number(ec) * 0.78125,
            "EC (AUS)": ec => Number(ec) * 0.714285714,
            CF: ec => Number(ec) * 10,
            "PPM TDS": ec => Number(ec) * 500,
        },
    },

    basicData: {
        to: {
            // to get X to MB from...
            MB: mb => Number(mb),
            GB: mb => Number(mb) * 1000,
        },
        from: {
            // to get X from MB into...
            MB: mb => Number(mb),
            GB: mb => Number(mb) / 1000,
        },
    },
};

export default ConversionFactors;
