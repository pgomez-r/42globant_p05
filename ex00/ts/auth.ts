import { searchPhotos } from './main.js';

//Definitions of API needed fields
const clientId = 'lqoh-bgRkh73bMRYrvXsqiJD54shb6LXAVYPQ6qZOJw';
const clientSecretKey = 'HxnFSULnr_yvdyGadKI3y6Vg79KRbDZRKab23DMxEdY';
const responseType = 'code';
const scope = 'public';
//Redirect URI and AuthURL
const redirectUri = `${window.location.origin}/ex00/index.html`;
const authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}&prompt=consent`;
const tokenEndpoint = 'https://unsplash.com/oauth/token';

console.log('RedirectUri composed:', redirectUri);

window.addEventListener('load', () => {
	console.log('Page loaded');
	const code = getAuthorizationCode();
	if (code) { 
		console.log('Authorization code found:', code);
		exchangeCodeForToken(code);
	} else {
		console.log('No authorization code found');
		showLoginButton();
	}
});

function getAuthorizationCode(): string | null {
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
	console.log('Authorization code:', code);
	return code;
}

async function exchangeCodeForToken(code: string) {
	console.log('Exchanging code for token:', code);
	try {
		const response = await fetch(tokenEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: redirectUri,
				client_id: clientId,
				client_secret: clientSecretKey,
			}),
		});
		console.log('Token exchange response status:', response.status);
		if (!response.ok) {
			throw new Error('Token exchange failed');
		}
		const data = await response.json();
		const accessToken = data.access_token;
		console.log('Access token:', accessToken);
		localStorage.setItem('access_token', accessToken);
		window.history.replaceState({}, document.title, redirectUri);
		showUserContent();
	} catch (error) {
		console.error('Error exchanging code for token:', error);
	}
}

export function showLoginButton() {
	const mainContent = document.getElementById('main-content');
	if (mainContent) {
		mainContent.innerHTML = `
			<button id="login-btn">Login with Unsplash</button>
		`;
		const loginBtn = document.getElementById('login-btn');
		if (loginBtn) {
			loginBtn.addEventListener('click', () => {
				window.location.href = authUrl;
			});
		}
	}
}

export function showUserContent() {
	const mainContent = document.getElementById('main-content');
	if (mainContent) {
		mainContent.innerHTML = `
			<section id="search-section">
				<input type="text" id="search-input" placeholder="Search photos...">
				<button id="search-btn">Search</button>
			</section>
			<section id="gallery-section">
				<div id="gallery"></div>
			</section>
			<section id="favorites-section">
				<h2>Favorites</h2>
				<div id="favorites"></div>
			</section>
		`;
		const searchBtn = document.getElementById('search-btn');
		if (searchBtn) {
			searchBtn.addEventListener('click', () => {
				const query: string = (document.getElementById('search-input') as HTMLInputElement).value;
				searchPhotos(query);
			});
		}
	}
}

export function getAccessToken(): string | null {
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('access_token');
	return token;
}
