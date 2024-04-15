document.querySelector('.searchbar').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = encodeURIComponent(document.querySelector('input[name="term"]').value); // Encode the search term
    const response = await fetch(`/products/search?q=${query}`);
    const data = await response.json();
});
