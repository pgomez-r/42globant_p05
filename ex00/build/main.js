import { getAccessToken, showUserContent } from './auth.js';
var accessToken = null;
var favorites = [];
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
        gallery.innerHTML = photos.map(function (photo) { return "\n\t\t\t<div class=\"photo\">\n\t\t\t\t<img src=\"".concat(photo.urls.small, "\" alt=\"").concat(photo.alt_description, "\">\n\t\t\t\t<button class=\"favorite-btn\" data-photo-id=\"").concat(photo.id, "\">Favorite</button>\n\t\t\t</div>\n\t\t"); }).join('');
        // Add event listeners to favorite buttons
        var favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                var photoId = event.target.getAttribute('data-photo-id');
                var photo = photos.find(function (p) { return p.id === photoId; });
                if (photo) {
                    addFavorite(photo);
                }
            });
        });
    }
}
function addFavorite(photo) {
    if (!favorites.some(function (fav) { return fav.id === photo.id; })) {
        favorites.push(photo);
        displayFavorites();
    }
}
function displayFavorites() {
    var favoritesSection = document.getElementById('favorites');
    if (favoritesSection) {
        favoritesSection.innerHTML = favorites.map(function (photo) { return "\n\t\t\t<div class=\"photo\">\n\t\t\t\t<img src=\"".concat(photo.urls.small, "\" alt=\"").concat(photo.alt_description, "\">\n\t\t\t</div>\n\t\t"); }).join('');
    }
}
//# sourceMappingURL=main.js.map