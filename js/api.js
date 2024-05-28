const API_URL = 'https://api.chucknorris.io/jokes';

export async function fetchCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error('Problem fetching categories');
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch categories');
    }
}

export async function fetchJokes(query) {
    try {
        const url = query.category ? `${API_URL}/random?category=${query.category}` : `${API_URL}/search?query=${query.searchTerm}`;
        console.log(`Fetching jokes with URL: ${url}`); // Debugging eilutė
        const response = await fetch(url);
        if (!response.ok) throw new Error('Problem fetching jokes');
        const jokes = await response.json();
        return jokes;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch jokes');
    }
}

