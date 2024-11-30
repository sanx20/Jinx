import { ApiEndpoints } from '../../constants/ApiEndpoints';

export class ExchangesRepo {
    static async fetchExchanges() {
        try {
            const response = await fetch(ApiEndpoints.getExchanges);
            if (!response.ok) {
                throw new Error(`Error fetching exchanges. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching exchanges:', error.message);
            throw new Error(error.message);
        }
    }

}
