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
}

