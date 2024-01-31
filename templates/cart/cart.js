const url = 'http://localhost:3000/carts';

document.querySelector('body').addEventListener('click', function () {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data){
            for (let cart in data) {
                console.log(data.allTrip)
                document.querySelector('.book').innerHTML = `
                <div class="trip-details">
                <p class="departure">${data.allTrip.trips.departure} > ${data.allTrip.trips.arrival}</p>
                <p class="date">${moment(data.allTrip.trips.date).format('HH:mm')}</p>
                <p class="price">$${data.allTrip.trips.price}</p>
                <button type="button" class="book-button">Book</button>
            </div>`;
                console.log(data.allTrip)
            }
        }
    });
});