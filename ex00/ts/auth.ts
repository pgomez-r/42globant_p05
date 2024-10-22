
import { searchPhotos } from './main.js';

let clientId: string;
let clientSecretKey: string;
let responseType: string;
let scope: string;
let redirectUri: string;
let tokenEndpoint: string;
let authUrl: string;

// A promise to track configuration loading
const configLoaded: Promise<void> = new Promise((resolve, reject) => {
	// Fetch the configuration JSON file
	fetch('./config.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to load configuration');
			}
			return response.json();
		})
		.then(config => {
			// Set the variables with explicit typing
			clientId = config.clientId as string;
			clientSecretKey = config.clientSecretKey as string;
			responseType = config.responseType as string;
			scope = config.scope as string;
			redirectUri = `${window.location.origin}${config.redirectUri as string}`;
			tokenEndpoint = config.tokenEndpoint as string;
			authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}&prompt=consent`;
			console.log('Configuration loaded successfully:', config);
			console.log('RedirectUri composed:', redirectUri);
			// Resolve the promise to indicate that configuration is loaded
			resolve();
		})
		.catch(error => {
			console.error('Error loading configuration:', error);
			reject(error);
		});
});

function initializeApp() {
	window.addEventListener('load', () => {
		console.log('Page loaded');
		const code = getAuthorizationCode();
		if (code) { 
			console.log('Authorization code found:', code);
			// Ensure configuration is loaded before exchanging the code
			configLoaded.then(() => exchangeCodeForToken(code)).catch(error => {
				console.error('Failed to exchange code for token:', error);
			});
		} else {
			console.log('No authorization code found');
			showLoginButton();
		}
	});
}

initializeApp();

function getAuthorizationCode(): string | null {
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
	console.log('Authorization code:', code);
	return code;
}

async function exchangeCodeForToken(code: string) {
	console.log('Exchanging code for token:', code);
	try {
		if (!clientId || !clientSecretKey) {
			throw new Error('Client ID or Client Secret is not defined');
		}
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
		showUserContent(accessToken);
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

export function showUserContent(accessToken: string) {
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
				searchPhotos(query, accessToken);
			});
		}
	}
}

export function getAccessToken(): string | null {
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('access_token');
	return token;
}
