interface UnsplashResult {
    urls: {
        small: string;
    };
    links: {
        html: string;
    };
}
//Tomamos todos los elementos del html
const searchForm = document.querySelector("#search-form");
const searchBox = document.querySelector("#search-box");
const searchResults = document.querySelector("#search-results");
const showMore = document.querySelector("#show-more");

let keyword = "";//variable que guarda la palabra a buscar
let page = 1; //número de pagina de busqueda
const accessKey = "lqoh-bgRkh73bMRYrvXsqiJD54shb6LXAVYPQ6qZOJw"; 

//Función que trae los resultados
async function buscarImagenes(){
    //tomo el valor que ingresó el usuario
    if (searchBox)
	{
		const inputElement = searchBox as HTMLInputElement;
		keyword = inputElement.value;
	}
    //armo la url
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    //realizo la busqueda
    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);

    //controlo, si es la primera vez que busco limpio el contendor
    //donde se muestran los resultados
    if(page===1 && searchResults){
        searchResults.innerHTML = "";
    }

    const resultados: UnsplashResult[] = data.results;
    //Por cada resultado armo un enlace a, con la imagen dentro
    resultados.map((result: UnsplashResult) => {
        const imagen = document.createElement("img");
        imagen.src = result.urls.small;
        const imagenLink = document.createElement("a");
        imagenLink.href = result.links.html;
        imagenLink.target = "_blank";

        imagenLink.appendChild(imagen);

        //agrego el elemento al contendor
        if (searchResults)
			searchResults.appendChild(imagenLink);
    });

    //muestro el botón mostrar mas
    if (showMore)
	{
		const inputElement = showMore as HTMLInputElement;
		inputElement.style.display = "block";
	}

}

//Agrego funcionalidad para cuando
if (searchForm)
{
	searchForm.addEventListener("submit", (e)=>{
    //Evito que se regarge la pàgina
    e.preventDefault();
    page = 1;
    buscarImagenes();
})
}

//Funcionalidad al boton Mostrar mas.
if (showMore)
{
	showMore.addEventListener("click", () =>{
    page++;
    buscarImagenes();
})
}

