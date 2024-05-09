import { searchQuranText } from './quranAPI.js';
import { clearQuranContainer, displayQuranText } from './ui.js';

document.getElementById('searchBtn').addEventListener('click', async () => {
    const keyword = document.getElementById('searchInput').value;
    try {
        clearQuranContainer();
        const verses = await searchQuranText(keyword);
        displayQuranText(verses.matches);
    } catch (error) {
        console.error('Error:', error);
    }
});
