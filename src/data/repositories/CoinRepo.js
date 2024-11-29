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
    
}
