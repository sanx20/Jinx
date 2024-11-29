import { ApiEndpoints } from '../../constants/ApiEndpoints';

export class ExchangesRepo {
    static async fetchExchanges() {
        try {
            const response = await fetch(ApiEndpoints.getExchanges);
            console.log('response:', response);
            if (!response.ok) {
                throw new Error(`Error fetching exchanges. Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching exchanges:', error.message);
            throw new Error(error.message);
        }
    }

    static async fetchExchangeDetails(exchangeId) {
        try {
            const response = await fetch(`${ApiEndpoints.getExchangeDetails}?id=${exchangeId}`);
            if (!response.ok) {
                throw new Error(`Error fetching exchange details. Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching exchange details:', error.message);
            throw new Error(error.message);
        }
    }
}
