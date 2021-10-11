//MAIN->logica d inicializacion puntual de la aplicacion: domContentloaded,eventlisteners iniciales,solo agregar eventos

// https://api.giphy.com/v1/gifs/search/tags?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY
// trending: https://api.giphy.com/v1/gifs/trending?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY&limit=3&rating=g

const API_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "u97suGng8xUtL28uyoZRwdmODNFgxzIY";

// const getGifosToArray = async () => {
//     try {
//         // const gifs = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY");
//         // return gifs.json()
//         const gifs = await fetch(`${API_URL}/trending?api_key=${API_KEY}`);
//         return gifs.json()
        
//     } catch (error) {
//         console.log("Ocurrio un error",error)
//     }
// }
//"https://api.giphy.com/v1/gifs/trending?&random_id=e826c9fc5c929e0d6c6d423841a282aa&rating=g&api_key=W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I"
//yo:
//"https://api.giphy.com/v1/gifs/trending?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY"


const getTrendingGifos = async () => {
    try {
        const gifs = await fetch(`${API_URL}/trending?api_key=${API_KEY}&limit=3&rating=g`);
        return gifs.json()
    } catch (error) {
        console.log("Ocurrio un error",error)
    }
}

//Inicializar Favoritos 
const favoritesGifos = () => {
    if (localStorage.getItem("favorites")){                                          //consulta si existe "favoritos"                          
        //localStorage.setItem("favorites", JSON.stringify({favorites: []})); 
        //pintarGifFav();
    }else {                                                                          //si no existe (setea con setItem)
        localStorage.setItem("favorites", JSON.stringify({favorites: []}));    //desp pusheamos este array
    }
    const arrayGifs = localStorage.setItem("gifs", JSON.stringify({gifs: []}));
    //localStorage.setItem("gifs", JSON.stringify({gifs: []}));
}
// const arrayFavorites = [];

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

    //const gifosDataToArray = await getGifosToArray();
    //favoritesGifos(gifosDataToArray);
    favoritesGifos();                                                 //inicializar favorites
    pintarGifFav();
});

//----------------------------HEADER:  cuando scrolleas aparece sombra en el header-------------------
const shadowHeader = () => {
    document.querySelector("header").classList.toggle('scrollActive'); 
}
window.addEventListener("scroll", shadowHeader);