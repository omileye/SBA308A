export function clearQuranContainer() {
    const quranContainer = document.getElementById('quranContainer');
    quranContainer.innerHTML = '';
}

export function displayQuranText(verses) {
    const quranContainer = document.getElementById('quranContainer');
    verses.forEach(verse => {
        const p = document.createElement('p');
        p.textContent = `${verse.surah.name} ${verse.ayah}:${verse.text}`;
        quranContainer.appendChild(p);
    });
}
