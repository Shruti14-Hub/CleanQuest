// 1. Search Functionality
const searchInput = document.querySelector('#searchInput'); // Assuming there's an input field with ID 'searchInput'
const cards = document.querySelectorAll('.card'); // Assuming cards have the class 'card'

searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// 2. Show More/Show Less Toggle
const showMoreBtn = document.querySelector('#showMoreBtn'); // Assuming there's a button with ID 'showMoreBtn'
const additionalCards = document.querySelector('.additional-cards'); // Assuming additional cards have the class 'additional-cards'

showMoreBtn.addEventListener('click', function () {
    additionalCards.classList.toggle('d-none'); // Toggle visibility
    showMoreBtn.textContent = additionalCards.classList.contains('d-none') ? 'Show More' : 'Show Less';
});

// 3. Dynamic Card Loading (Example with Fetch)
function loadCards() {
    fetch('cards.json') // Replace with your actual API endpoint or JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const cardContainer = document.querySelector('.card-container'); // Assuming cards are inside a container with class 'card-container'
            data.forEach(cardData => {
                const card = document.createElement('div');
                card.classList.add('card', 'card2');
                card.style.width = '18rem';
                card.innerHTML = `
                    <img src="${cardData.image}" class="card-img-top" alt="${cardData.title}">
                    <div class="card-body">
                        <h5 class="card-title">${cardData.title}</h5>
                        <p class="card-text">${cardData.description}</p>
                        <a href="${cardData.link}" class="btn btn-primary">Clean & Upload</a>
                    </div>
                `;
                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading cards:', error));
}

// Call the function to load cards dynamically
loadCards();
fetch('cards.json') // Fetches the JSON file from the same directory
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const cardContainer = document.querySelector('.card-container'); // Assuming cards are inside a container with class 'card-container'
        data.forEach(cardData => {
            const card = document.createElement('div');
            card.classList.add('card', 'card2');
            card.style.width = '18rem';
            card.innerHTML = `
                <img src="${cardData.image}" class="card-img-top" alt="${cardData.title}">
                <div class="card-body">
                    <h5 class="card-title">${cardData.title}</h5>
                    <p class="card-text">${cardData.description}</p>
                    <a href="${cardData.link}" class="btn btn-primary">Clean & Upload</a>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading cards:', error));