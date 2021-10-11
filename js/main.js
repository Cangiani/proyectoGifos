//MAIN->logica d inicializacion puntual de la aplicacion: domContentloaded,eventlisteners iniciales,solo agregar eventos

const API_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "u97suGng8xUtL28uyoZRwdmODNFgxzIY";

const getTrendingGifos = async () => {
    try {
        const gifs = await fetch(`${API_URL}/trending?api_key=${API_KEY}&limit=3&rating=g`);
        return gifs.json()
    } catch (error) {
        console.log("Ocurrio un error",error)
    }
}

const favoritesGifos = () => {                          //Inicializar Favoritos 
    if (localStorage.getItem("favorites")){                                 
        //pintarGifFav();
    }else {                                                                      
        localStorage.setItem("favorites", JSON.stringify({favorites: []}));    
    }
    // const arrayGifs = localStorage.setItem("gifs", JSON.stringify({gifs: []})); 
}

const trendingToArray = (arr) => {
    const arrayGifs = JSON.parse(localStorage.getItem('gifs'));
    arr.forEach(el => {
        arrayGifs.gifs.push(el);
        console.log(arrayGifs);
        localStorage.setItem('gifs', JSON.stringify(arrayGifs));
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const imagesApiTrending = await getTrendingGifos();
    const trendingToArray = (imagesApiTrending.data);
    const trendingImgs = await trendingImages(imagesApiTrending);       //se lo paso a la función que pinta trending
    
    favoritesGifos();                                                 //inicializar favorites
    pintarGifFav();
});

//----------------------------HEADER:  cuando scrolleas aparece sombra en el header-------------------
const shadowHeader = () => {
    document.querySelector("header").classList.toggle('scrollActive'); 
}
window.addEventListener("scroll", shadowHeader);