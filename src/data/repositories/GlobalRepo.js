import { ApiEndpoints } from '../../constants/ApiEndpoints';

export class GlobalRepo {
    static async fetchGlobalStats() {
        try {
            const response = await fetch(ApiEndpoints.getGlobalStats);
            if (!response.ok) {
                throw new Error(`Error fetching global stats. Status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching global stats:', error.message);
            throw new Error('Error fetching global stats: ' + error.message);
        }
    }
}
