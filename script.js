const searchButton = document.querySelector('button[type="submit"]');
const bookingContainer = document.getElementById('booking'); 

searchButton.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le bouton de soumettre le formulaire

    // Récupération des valeurs des champs de formulaire
    const departureCity = document.getElementById('departure-city').value;
    console.log(departureCity);
    const arrivalCity = document.getElementById('arrival-city').value;
    console.log(arrivalCity);

    // Construction de l'URL pour la requête GET
    const url = `http://localhost:3000/trips?departure=${departureCity}&arrival=${arrivalCity}&_=${new Date().getTime()}`;

    // Envoi de la requête GET au serveur
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        bookingContainer.innerHTML = ''; // Vide le conteneur avant d'ajouter les nouveaux résultats

        // Gérer l'affichage des voyages ou un message "not found"
        if (data.result && data.allTrip.length > 0) {
            data.allTrip.forEach(trip => {
                const tripElement = document.createElement('div');
                tripElement.className = 'trips-list';
                tripElement.innerHTML = `
                    <div class="trip-details">
                        <p class="departure">${trip.departure} > ${trip.arrival}</p>
                        <p class="date">${moment(trip.date).format('HH:mm')}</p>
                        <p class="price">$${trip.price}</p>
                        <button type="button" class="book-button" data-trip-id="${trip._id}">Book</button>
                    </div>`;
                bookingContainer.appendChild(tripElement);
            });

            // Ajouter des gestionnaires d'événements pour les boutons "Book"
            addBookEventListeners();
        } else {
            showNotFoundMessage();
        }
    })
    .catch(error => {
    
        console.error('Error:', error);
        showNotFoundMessage();
    });
});

function addBookEventListeners() {
    const bookButtons = document.querySelectorAll('.book-button');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tripId = this.dataset.tripId;
            fetch('http://localhost:3000/trips/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tripId: tripId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    alert('Trip booked successfully!');
                } else {
                    alert('Failed to book the trip.');
                }
            })
        });
    });
}

function showNotFoundMessage() {
    const notFoundElement = document.createElement('div');
    notFoundElement.className = 'not-found';
    notFoundElement.innerHTML = `
        <img src="/assets/images/train.png" class="train-draw" alt="No trips found">
        <p>No trips found</p>
    `;
    bookingContainer.appendChild(notFoundElement);
}
