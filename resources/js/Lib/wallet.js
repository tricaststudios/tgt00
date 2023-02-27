export function formatUSDT(amount) {
    return parseFloat(amount / 1000000)
        .toFixed(4)
        .toString();
}
