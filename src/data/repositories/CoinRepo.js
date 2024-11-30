import { ApiEndpoints } from '../../constants/ApiEndpoints';

export class CoinRepo {
    static async fetchMarketData(start = 0, limit = 10) {
        try {
            const response = await fetch(
                `${ApiEndpoints.getMarketData}?start=${start}&limit=${limit}`
            );
            if (!response.ok) {
                throw new Error(`Error fetching market data. Status: ${response.status}`);
            }
            const result = await response.json();
            return {
                data: result.data,
                pagination: {
                    has_next_page: result.data.length === limit,
                    current_page: start / limit + 1,
                },
            };
        } catch (error) {
            console.error('Error fetching market data:', error.message);
            throw new Error('Error fetching market data: ' + error.message);
        }
    }

    static async fetchCoinDetails(coinId) {
        try {
            const response = await fetch(
                `${ApiEndpoints.getCoinDetails}?id=${coinId}`
            );
            if (!response.ok) {
                throw new Error(`Error fetching coin details. Status: ${response.status}`);
            }
            const result = await response.json();
            return result[0];
        } catch (error) {
            console.error('Error fetching coin details:', error.message);
            throw new Error('Error fetching coin details: ' + error.message);
        }
    }

    static async fetchCoinMarkets(coinId) {
        try {
            const response = await fetch(
                `${ApiEndpoints.getCoinMarkets}?id=${coinId}`
            );
            if (!response.ok) {
                throw new Error(`Error fetching coin markets. Status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching coin markets:', error.message);
            throw new Error('Error fetching coin markets: ' + error.message);
        }
    }

    static async generateCandleData(coinId) {
        try {
            const coinDetails = await this.fetchCoinDetails(coinId);

            const currentPrice = parseFloat(coinDetails.price_usd || 0);
            const percentChange24h = parseFloat(coinDetails.percent_change_24h || 0);
            const percentChange1h = parseFloat(coinDetails.percent_change_1h || 0);
            const percentChange7d = parseFloat(coinDetails.percent_change_7d || 0);

            const now = Date.now();
            const data = Array.from({ length: 10 }, (_, index) => {
                const open = currentPrice * (1 - Math.random() * percentChange24h / 100);
                const close = currentPrice * (1 + Math.random() * percentChange24h / 100);
                const high = Math.max(open, close) * (1 + Math.random() * 0.05);
                const low = Math.min(open, close) * (1 - Math.random() * 0.05);

                return {
                    time: new Date(now - index * 60000).toLocaleTimeString(),
                    open: open.toFixed(2),
                    close: close.toFixed(2),
                    high: high.toFixed(2),
                    low: low.toFixed(2),
                };
            });

            return data.reverse();
        } catch (error) {
            console.error('Error generating candle data:', error.message);
            throw new Error('Error generating candle data: ' + error.message);
        }
    }
}
