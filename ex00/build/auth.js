"use strict";
// Load API credentials and configurations from server-config.json
fetch('server-config.json')
    .then(function (response) { return response.json(); })
    .then(function (config) {
    var _a;
    var clientId = config.clientId;
    var clientSecretKey = config.clientSecretKey;
    var responseType = config.responseType;
    var scope = config.scope;
    var tokenEndpoint = config.tokenEndpoint;
    var redirectUri = "".concat(window.location.origin, "/ex00/callback.html");
    var authUrl = "https://unsplash.com/oauth/authorize?client_id=".concat(clientId, "&redirect_uri=").concat(encodeURIComponent(redirectUri), "&response_type=").concat(responseType, "&scope=").concat(scope, "&prompt=consent");
    console.log("redURI: ", redirectUri);
    console.log("authURL: ", authUrl);
    // Add event listener to the login button
    (_a = document.getElementById('login-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        window.location.href = authUrl;
    });
    // Only handle the authorization code if on the callback page
    if (window.location.pathname === '/ex00/callback.html') {
        handleCallback(clientId, clientSecretKey, tokenEndpoint, redirectUri);
    }
})
    .catch(function (error) { return console.error('Error loading config:', error); });
// Function to handle the callback and exchange the authorization code for an access token
function handleCallback(clientId, clientSecretKey, tokenEndpoint, redirectUri) {
    console.log("actual URL: ", window.location.href);
    // Handle the authorization code in the callback page
    var urlParams = new URLSearchParams(window.location.search);
    console.log("url after authURL accessed: ", urlParams);
    var code = urlParams.get('code');
    if (code) {
        // Exchange the authorization code for an access token
        fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecretKey,
                redirect_uri: redirectUri,
                code: code,
                grant_type: 'authorization_code'
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            // Store the access token securely
            localStorage.setItem('unsplash_access_token', data.access_token);
            // Redirect to the main page
            window.location.href = '/ex00/index.html';
        })
            .catch(function (error) { return console.error('Error exchanging code for token:', error); });
    }
    else {
        console.error('Authorization code not found');
    }
}
//# sourceMappingURL=auth.js.map