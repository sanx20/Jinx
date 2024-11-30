import { ApiEndpoints } from '../../constants/ApiEndpoints';

export class CryptoNewsRepo {
    static async fetchNews(searchTerm, filter) {
        const authToken = '2a576e0e12ab6c331d173cec2374600b2d9c38f0';
        let url = `${ApiEndpoints.getCryptoNews}?auth_token=${authToken}&public=true`;

        if (searchTerm) {
            url += `&currencies=${searchTerm}`;
        }

        if (filter) {
            url += `&filter=${filter}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching news. Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching news:', error.message);
            throw new Error(error.message);
        }
    }
}