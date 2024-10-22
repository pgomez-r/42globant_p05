var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { searchPhotos } from './main.js';
//Definitions of API needed fields
var clientId = 'lqoh-bgRkh73bMRYrvXsqiJD54shb6LXAVYPQ6qZOJw';
var clientSecretKey = 'HxnFSULnr_yvdyGadKI3y6Vg79KRbDZRKab23DMxEdY';
var responseType = 'code';
var scope = 'public';
//Redirect URI and AuthURL
var redirectUri = "".concat(window.location.origin, "/ex00/index.html");
var authUrl = "https://unsplash.com/oauth/authorize?client_id=".concat(clientId, "&redirect_uri=").concat(encodeURIComponent(redirectUri), "&response_type=").concat(responseType, "&scope=").concat(scope, "&prompt=consent");
var tokenEndpoint = 'https://unsplash.com/oauth/token';
console.log('RedirectUri composed:', redirectUri);
window.addEventListener('load', function () {
    console.log('Page loaded');
    var code = getAuthorizationCode();
    if (code) {
        console.log('Authorization code found:', code);
        exchangeCodeForToken(code);
        window.location.href = authUrl;
    }
    else {
        console.log('No authorization code found');
        showLoginButton();
    }
});
function getAuthorizationCode() {
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('code');
    console.log('Authorization code:', code);
    return code;
}
function exchangeCodeForToken(code) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, accessToken, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Exchanging code for token:', code);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(tokenEndpoint, {
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
                        })];
                case 2:
                    response = _a.sent();
                    console.log('Token exchange response status:', response.status);
                    if (!response.ok) {
                        throw new Error('Token exchange failed');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    accessToken = data.access_token;
                    console.log('Access token:', accessToken);
                    localStorage.setItem('access_token', accessToken);
                    window.history.replaceState({}, document.title, redirectUri);
                    showUserContent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error exchanging code for token:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function showLoginButton() {
    var mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = "\n\t\t\t<button id=\"login-btn\">Login with Unsplash</button>\n\t\t";
        var loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function () {
                window.location.href = authUrl;
            });
        }
    }
}
export function showUserContent() {
    var mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = "\n\t\t\t<section id=\"search-section\">\n\t\t\t\t<input type=\"text\" id=\"search-input\" placeholder=\"Search photos...\">\n\t\t\t\t<button id=\"search-btn\">Search</button>\n\t\t\t</section>\n\t\t\t<section id=\"gallery-section\">\n\t\t\t\t<div id=\"gallery\"></div>\n\t\t\t</section>\n\t\t\t<section id=\"favorites-section\">\n\t\t\t\t<h2>Favorites</h2>\n\t\t\t\t<div id=\"favorites\"></div>\n\t\t\t</section>\n\t\t";
        var searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function () {
                var query = document.getElementById('search-input').value;
                searchPhotos(query);
            });
        }
    }
}
export function getAccessToken() {
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get('access_token');
    return token;
}
//# sourceMappingURL=auth.js.map