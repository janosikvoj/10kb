navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        var video = document.getElementById('webcam');
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Chyba pri získavaní prístupu k webkamere: ', error);
    });

function generateRandomRating() {
    return Math.floor(Math.random() * 10) + 1;
}


function rateBeauty() {
    var rating = generateRandomRating();
    document.getElementById('rating').innerHTML = 'Vaše hodnotenie krásy: ' + rating;
}