import axios from 'axios';

export const intervals = [
    { name: '1 Min.', value: '1m' },
    { name: '1 Day', value: '1d' },
    { name: '1 Week', value: '1w' },
    { name: '1 Month', value: '1M' },
];

export async function getPriceTicker(url, symbol) {
    const response = await axios.get(`${url}/markets/${symbol}/ticker`);

    return {
        priceChange: response.data.priceChange,
        priceChangePercent: response.data.priceChangePercent,
        currentPrice: response.data.openPrice,
        high: response.data.highPrice,
        low: response.data.lowPrice,
    };
}

export async function getKlines(url, symbol, interval = '1m', limit = 50) {
    const response = await axios.get(`${url}/markets/${symbol}?interval=${interval}&limit=${limit}`);

    const formattedData = await response.data.map((data, key) => {
        return {
            x: new Date(data[6]),
            y: [data[1], data[2], data[3], data[4]],
        };
    });

    return [{ id: 'candlestick', data: formattedData }];
}
