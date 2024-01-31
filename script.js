const searchButton = document.querySelector('button[type="submit"]');
const bookingContainer = document.getElementById('booking'); 

searchButton.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le bouton de soumettre le formulaire

    // Récupération des valeurs des champs de formulaire
    const departureCity = document.getElementById('departure-city').value;
    console.log(departureCity);
    const arrivalCity = document.getElementById('arrival-city').value;
    console.log(arrivalCity);
   // const departureDate = document.getElementById('departure-date').value;

    // Construction de l'URL pour la requête GET
    const url = `http://localhost:3000/trips?departure=${departureCity}&arrival=${arrivalCity}&_=${new Date().getTime()}`;

    // Envoi de la requête GET au serveur
    fetch(url, {
        method: 'GET',
       
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        bookingContainer.innerHTML = ''; // Vide le conteneur avant d'ajouter les nouveaux résultats
    
        // Ici, on accède au champ 'allTrip' de l'objet de données
        if (data.result && data.allTrip.length > 0) {
            data.allTrip.forEach(trip => {
                const tripElement = document.createElement('div');
                tripElement.className = 'trips-list';
                tripElement.innerHTML = `
                    <div class="trip-details">
                        <p class="departure">${trip.departure} > ${trip.arrival}</p>
                        <p class="date">${moment(trip.date).format('HH:mm')}</p>
                        <p class="price">$${trip.price}</p>
                        <button type="button" class="book-button">Book</button>
                    </div>`;
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
        // Gérer les erreurs ici
        console.error('Error:', error);
    });
});    