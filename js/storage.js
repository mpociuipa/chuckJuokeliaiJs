// Eksportuokime funkciją saveJokeToLocalStorage
export function saveJokeToLocalStorage(id, joke) {
    console.log('Saving joke:', id, joke); // Debug linija

    const savedJokes = JSON.parse(localStorage.getItem('savedJokes')) || [];
    savedJokes.push({ id, joke });
    localStorage.setItem('savedJokes', JSON.stringify(savedJokes));

    // Patikrinkime, ar juokeliai tikrai yra išsaugomi
    console.log('Current saved jokes:', JSON.parse(localStorage.getItem('savedJokes')));
}

document.addEventListener('DOMContentLoaded', () => {
    const savedJokesContainer = document.getElementById('saved-jokes-list');
    if (savedJokesContainer) {
        const savedJokes = JSON.parse(localStorage.getItem('savedJokes')) || [];
        console.log('Loaded saved jokes:', savedJokes); // Debug linija

        savedJokes.forEach(joke => {
            const jokeBlock = document.createElement('div');
            jokeBlock.classList.add('joke');
            jokeBlock.textContent = joke.joke; // Patikrina-m tiksli lauko pavadinima
            savedJokesContainer.append(jokeBlock);
        });
    }
});
