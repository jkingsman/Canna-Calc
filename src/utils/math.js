export function round(value, decimals) {
    return Number(Math.round(Number(value) * Math.pow(10, Number(decimals))) / Math.pow(10, Number(decimals)));
}

export function defaultRound(value) {
    return Number(round(value, 3));
}
