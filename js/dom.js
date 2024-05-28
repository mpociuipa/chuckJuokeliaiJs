import { fetchCategories, fetchJokes } from './api.js';
import { saveJokeToLocalStorage } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const searchTermInput = document.getElementById('search-term');
    const searchForm = document.querySelector('.search__form');
    const jokesContainer = document.getElementById('jokes');

    // Add empty option to allow flexible deselection
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Select a category';
    categorySelect.appendChild(emptyOption);

    // Populate categories
    fetchCategories().then(categories => {
        console.log('Fetched categories:', categories); // Debugging linija
        if (Array.isArray(categories) && categories.length > 0) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.append(option);
            });
        } else {
            console.warn('No categories fetched');
        }
    }).catch(error => {
        console.error('Error while fetching categories:', error);
    });

    // Handle form submission
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        
        // Validate input
        const category = categorySelect.value;
        const searchTerm = searchTermInput.value.trim();
        
        // Ensure only one of category or searchTerm is provided
        if (!category && !searchTerm) {
            alert('Please either choose a category or enter a search term.');
            return;
        }

        const query = category ? { category } : { searchTerm };
        fetchJokes(query).then(data => {
            console.log('Fetched jokes:', data); // Debugging linija
            
            jokesContainer.innerHTML = '';
            const jokes = query.category ? [data] : data.result;
            if (jokes.length === 0) {
                jokesContainer.innerHTML = '<p>No jokes found. Try a different keyword.</p>';
            } else {
                jokes.forEach(joke => {
                    const jokeBlock = document.createElement('div');
                    jokeBlock.classList.add('joke');
                    jokeBlock.innerHTML = `
                        <p>${joke.value}</p>
                        <button onclick="saveJoke('${joke.id}', '${joke.value.replace(/'/g, "\\'")}')">Save</button>
                    `;
                    jokesContainer.append(jokeBlock);
                });
            }
        }).catch(error => {
            console.error('Error fetching jokes:', error);
            jokesContainer.innerHTML = '<p>Failed to fetch jokes. Please try again later.</p>';
        });
    });

    // Disable input fields
    categorySelect.addEventListener('change', () => {
        searchTermInput.disabled = !!categorySelect.value;
        if (!categorySelect.value) searchTermInput.value = "";
    });
    
    searchTermInput.addEventListener('input', () => {
        categorySelect.disabled = !!searchTermInput.value;
        if (!searchTermInput.value) categorySelect.value = "";
    });
});

window.saveJoke = (id, joke) => {
    saveJokeToLocalStorage(id, joke);
    alert('Joke saved!');
};

