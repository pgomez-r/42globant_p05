import { getAccessToken, showUserContent } from './auth.js';
var accessToken = null;
document.addEventListener('DOMContentLoaded', function () {
    accessToken = getAccessToken();
    // Check if user content should be shown
    var mainContent = document.getElementById('main-content');
    if (mainContent && accessToken) {
        showUserContent(accessToken);
    }
});
export function searchPhotos(query, accessToken) {
    console.log('Access token in searchPhotos:', accessToken);
    if (!accessToken) {
        console.error('No access token available for search');
        return;
    }
    fetch("https://api.unsplash.com/search/photos?query=".concat(query, "&per_page=18"), {
        headers: {
            Authorization: "Bearer ".concat(accessToken)
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        displayPhotos(data.results);
    })
        .catch(function (error) {
        console.error('Error fetching photos:', error);
    });
}
function displayPhotos(photos) {
    var gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.innerHTML = '';
        photos.forEach(function (photo) {
            var photoDiv = document.createElement('div');
            photoDiv.classList.add('photo');
            photoDiv.style.backgroundImage = "url(".concat(photo.urls.small, ")");
            gallery.appendChild(photoDiv);
        });
    }
}
//# sourceMappingURL=main.js.map