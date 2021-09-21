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

// const shadowHeader = () => {
//     document.querySelector("header .menu").classList.add("scrollActive");
// }
// document.addEventListener("scroll", shadowHeader);

// window.onscroll = function() {shadowNavBar()};

// function shadowNavBar() {
//   if (document.body.scrollTop > 2 || document.documentElement.scrollTop > 50) {
//     document.querySelector("header .menu").classList.add("scrollActive");
//   } else {
//     // document.querySelector("header .menu").style.
//   }
// }

// document.addEventListener('sticky-change', e => {
//     const header = e.detail.target;  // header became sticky or stopped sticking.
//     const sticking = e.detail.stuck; // true when header is sticky.
//     header.classList.toggle('shadow', sticking); // add drop shadow when sticking.
  
//     document.querySelector('.who-is-sticking').textContent = header.textContent;
//   });


// const scrollDown = (ev) =>{
//     if (window.onscroll) {
//         ev.target.classList.add("scrollActive");
//     }    
// }
// document.querySelector("header").addEventListener("scroll", scrollDown);
//window.addEventListener("scroll", scrollDown);


// window.onscroll = function() {
//     let distanceScrolled = document.documentElement.scrollTop;
//     if (distanceScrolled > 10) {
//         document.querySelector("header").add("scrollActive");
//     }
// }

// if (ev.target.pageYOffset > sticky) {
//     ev.target.classList.add("scrollActive");
// }    
//   else {
//     header.classList.remove("sticky");
//   }

// const triggerMenu = document.querySelector(".page-header .trigger-menu");

// // const scrollUp = "scroll-up";
// const scrollDown = "scroll-down";
// let lastScroll = 0;


// window.addEventListener("scroll", () => {
//   const currentScroll = window.pageYOffset;
//   if (currentScroll <= 0) {
//     body.classList.remove(scrollUp);
//     return;
//   }
  
//   if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
//     // down
//     body.classList.remove(scrollUp);
//     body.classList.add(scrollDown);
//   } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
//     // up
//     body.classList.remove(scrollDown);
//     body.classList.add(scrollUp);
//   }
//   lastScroll = currentScroll;
// });