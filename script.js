const searchButton = document.querySelector('button[type="submit"]');
const bookingContainer = document.getElementById('booking'); 

searchButton.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le bouton de soumettre le formulaire

    // Récupération des valeurs des champs de formulaire
    const departureCity = document.getElementById('departure-city').value;
    const arrivalCity = document.getElementById('arrival-city').value;
    const departureDate = document.getElementById('departure-date').value;

    // Construction de l'URL pour la requête GET
    const url = `http://localhost:3000/search-trips?departure=${departureCity}&arrival=${arrivalCity}&date=${departureDate}`;

    // Envoi de la requête GET au serveur
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(trips => {
        bookingContainer.innerHTML = ''; // Vide le conteneur avant d'ajouter les nouveaux résultats

        if (trips && trips.length > 0) {
            trips.forEach(trip => {
                const tripElement = document.createElement('div');
                tripElement.className = 'trips-list';
                tripElement.innerHTML = `
                    <div class="trip-details">
                        <p class="departure">${trip.departure} > ${trip.arrival}</p>
                        <p class="date">${new Date(trip.date).toLocaleDateString()}</p>
                        <p class="price">$${trip.price}</p>
                    </div>
                    <button type="button" class="book-button">Book</button>
                `;
                bookingContainer.appendChild(tripElement);
            });
        } else {
            const notFoundElement = document.createElement('div');
            notFoundElement.className = 'not-found';
            notFoundElement.innerHTML = `
                <img src="/assets/images/train.png" class="train-draw" alt="No trips found">
                <p>No trips found</p>
            `;
            bookingContainer.appendChild(notFoundElement);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
