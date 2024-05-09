export async function searchQuranText(keyword) {
    try {
        const response = await fetch(`http://api.alquran.cloud/v1/search/${keyword}/all/en`);
        if (!response.ok) {
            throw new Error('Failed to search Quranic text');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error searching Quranic text:', error);
        throw error;
    }
}
