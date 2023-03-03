export function formatUSDT(amount) {
    return parseFloat(amount / 1000000)
        .toFixed(4)
        .toString();
}

export function formatUSD(amount) {
    return parseFloat(amount).toFixed(2).toString();
}
