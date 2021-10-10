//MAIN->logica d inicializacion puntual de la aplicacion: domContentloaded,eventlisteners iniciales,solo agregar eventos

// https://api.giphy.com/v1/gifs/search/tags?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY
// trending: https://api.giphy.com/v1/gifs/trending?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY&limit=3&rating=g

//Inicializar Favoritos 
const favoritesGifos = () => {
    if (localStorage.getItem("favorites")){                                          //consulta si existe "favoritos"                          
        //localStorage.setItem("favorites", JSON.stringify({favorites: []})); 
        pintarGifFav();
    }else {                                                                          //si no existe (setea con setItem)
        localStorage.setItem("favorites", JSON.stringify({favorites: []}));    //desp pusheamos este array
    }
}
const arrayFavorites = [];

document.addEventListener("DOMContentLoaded", async () => {
    
    const imagesApiTrending = await getTrendingGifos();
    const trendingImgs = await trendingImages(imagesApiTrending);
    favoritesGifos();
});

//----------------------------HEADER:  cuando scrolleas aparece sombra en el header-------------------
const shadowHeader = () => {
    document.querySelector("header").classList.toggle('scrollActive'); 
}
window.addEventListener("scroll", shadowHeader);