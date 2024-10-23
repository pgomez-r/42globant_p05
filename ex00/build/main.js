"use strict";
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
//Tomamos todos los elementos del html
var searchForm = document.querySelector("#search-form");
var searchBox = document.querySelector("#search-box");
var searchResults = document.querySelector("#search-results");
var showMore = document.querySelector("#show-more");
var keyword = ""; //variable que guarda la palabra a buscar
var page = 1; //número de pagina de busqueda
var accessKey = "lqoh-bgRkh73bMRYrvXsqiJD54shb6LXAVYPQ6qZOJw";
//Función que trae los resultados
function buscarImagenes() {
    return __awaiter(this, void 0, void 0, function () {
        var inputElement, url, response, data, resultados, inputElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //tomo el valor que ingresó el usuario
                    if (searchBox) {
                        inputElement = searchBox;
                        keyword = inputElement.value;
                    }
                    url = "https://api.unsplash.com/search/photos?page=".concat(page, "&query=").concat(keyword, "&client_id=").concat(accessKey);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    //console.log(data);
                    //controlo, si es la primera vez que busco limpio el contendor
                    //donde se muestran los resultados
                    if (page === 1 && searchResults) {
                        searchResults.innerHTML = "";
                    }
                    resultados = data.results;
                    //Por cada resultado armo un enlace a, con la imagen dentro
                    resultados.map(function (result) {
                        var imagen = document.createElement("img");
                        imagen.src = result.urls.small;
                        var imagenLink = document.createElement("a");
                        imagenLink.href = result.links.html;
                        imagenLink.target = "_blank";
                        imagenLink.appendChild(imagen);
                        //agrego el elemento al contendor
                        if (searchResults)
                            searchResults.appendChild(imagenLink);
                    });
                    //muestro el botón mostrar mas
                    if (showMore) {
                        inputElement = showMore;
                        inputElement.style.display = "block";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//Agrego funcionalidad para cuando
if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
        //Evito que se regarge la pàgina
        e.preventDefault();
        page = 1;
        buscarImagenes();
    });
}
//Funcionalidad al boton Mostrar mas.
if (showMore) {
    showMore.addEventListener("click", function () {
        page++;
        buscarImagenes();
    });
}
//# sourceMappingURL=main.js.map