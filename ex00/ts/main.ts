
import { getAccessToken, showUserContent} from './auth.js';

let accessToken: string | null = null;

document.addEventListener('DOMContentLoaded', () => {
    accessToken = getAccessToken();

    // Check if user content should be shown
    const mainContent = document.getElementById('main-content');
    if (mainContent && accessToken) {
        showUserContent();
    }
});

export function searchPhotos(query: string): void {
	if (!accessToken) {
		console.error('No access token available for search');
		return;
	}

	fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
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
		gallery.innerHTML = '';
		photos.forEach(photo => {
			const photoDiv: HTMLDivElement = document.createElement('div');
			photoDiv.classList.add('photo');
			photoDiv.style.backgroundImage = `url(${photo.urls.small})`;
			gallery.appendChild(photoDiv);
		});
	}
}
