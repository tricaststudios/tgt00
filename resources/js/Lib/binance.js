import axios from 'axios';

export const intervals = [
    { name: '1 Min.', value: '1m' },
    { name: '1 Day', value: '1d' },
    { name: '1 Week', value: '1w' },
    { name: '1 Month', value: '1M' },
];

export async function getPriceTicker(symbol) {
    const response = await axios.get(`https://www.binance.com/api/v3/ticker?symbol=TRXUSDT`, {
        headers: {
            Accept: 'application/json',
        },
    });

    return {
        priceChange: response.priceChange,
        priceChangePercent: response.priceChangePercent,
        currentPrice: response.openPrice,
        high: response.highPrice,
        low: response.lowPrice,
    };
}

export async function getKlines(symbol, interval = '1m') {
    const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=50`);

    const formattedData = await response.data.map((data, key) => {
        return {
            x: new Date(data[0]),
            y: [data[1], data[2], data[3], data[4]],
        };
    });

    return [{ id: 'candlestick', data: formattedData }];
}
