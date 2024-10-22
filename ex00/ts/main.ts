
import { getAccessToken, showUserContent} from './auth.js';

let	accessToken:string | null = null;
let	favorites: any[] = [];

document.addEventListener('DOMContentLoaded', () => {
	accessToken = getAccessToken();

	// Check if user content should be shown
	const mainContent = document.getElementById('main-content');
	if (mainContent && accessToken) {
		showUserContent(accessToken);
	}
});

export function searchPhotos(query: string, accessToken: string): void {
	console.log('Access token in searchPhotos:', accessToken);
	if (!accessToken) {
		console.error('No access token available for search');
		return;
	}
	fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=18`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
	.then(response => response.json())
	.then(data => {
		displayPhotos(data.results);
	})
	.catch(error => {
		console.error('Error fetching photos:', error);
	});
}

function displayPhotos(photos: any[]): void {
	const gallery: HTMLElement | null = document.getElementById('gallery');
	if (gallery) {
		gallery.innerHTML = photos.map(photo => `
			<div class="photo">
				<img src="${photo.urls.small}" alt="${photo.alt_description}">
				<button class="favorite-btn" data-photo-id="${photo.id}">Favorite</button>
			</div>
		`).join('');

		// Add event listeners to favorite buttons
		const favoriteButtons = document.querySelectorAll('.favorite-btn');
		favoriteButtons.forEach(button => {
			button.addEventListener('click', (event) => {
				const photoId = (event.target as HTMLElement).getAttribute('data-photo-id');
				const photo = photos.find(p => p.id === photoId);
				if (photo) {
					addFavorite(photo);
				}
			});
		});
	}
}

function addFavorite(photo: any): void {
	if (!favorites.some(fav => fav.id === photo.id)) {
		favorites.push(photo);
		displayFavorites();
	}
}

function displayFavorites(): void {
	const favoritesSection: HTMLElement | null = document.getElementById('favorites');
	if (favoritesSection) {
		favoritesSection.innerHTML = favorites.map(photo => `
			<div class="photo">
				<img src="${photo.urls.small}" alt="${photo.alt_description}">
			</div>
		`).join('');
	}
}
