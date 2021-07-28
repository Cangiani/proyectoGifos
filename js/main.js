// MAIN.JS -> logica de inicializacion puntual de la aplicacion (dom contentloaded y eventlisteners iniciales)
//en main solo agregar eventos

const API_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "u97suGng8xUtL28uyoZRwdmODNFgxzIY";
// https://api.giphy.com/v1/gifs/search/tags?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY
// trending: https://api.giphy.com/v1/gifs/trending?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY&limit=3&rating=g




document.addEventListener("DOMContentLoaded", async () => {

    // favoritesGifos();

    const imagesApiTrending = await getTrendingGifos();
    const trendingImgs = await trendingImages(imagesApiTrending);

})


//     //create new a element
//     let a = document.createElement('a');
//     // get image as blob
//     let response = await fetch('https://media2.giphy.com/media/DvyLQztQwmyAM/giphy.gif?cid=e9ff928175irq2ybzjyiuicjuxk21vv4jyyn0ut5o0d7co50&rid=giphy.gif');
//     let file = await response.blob();
//     // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
//     a.download = 'myGif';
//     a.href = window.URL.createObjectURL(file);
//     //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
//     a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
//     //click on element to start download
//     a.click();
//   })();



//MODO NOCTURNO

//el boton "modo nocturno" tiene que decir "modo diurno"

const bodyNightMode =  document.querySelector("body");                    
const headerNightMode = document.querySelector("body > header");    
const navBarNightMode = document.querySelector("body > header > nav > ul > li");
const divHomeNightMode = document.querySelector("body > main > .home > h1"); 
// const searchNightMode = document.querySelector("")

const elementsNigthMode = [bodyNightMode, headerNightMode, navBarNightMode, divHomeNightMode];

// const titleTrendingNocturno = document.querySelector("body > main > .trendingTitle");   
// const sliderTrendingNocturno = document.querySelector("body > main > .sliderGifos");
// const trendingNight = [titleTrendingNocturno, sliderTrendingNocturno];

const liNightMode =  document.querySelector("body > header > nav > ul > li"); 

document.getElementById("nightModeBtn").addEventListener("click", () => {
    elementsNigthMode.forEach(elem => {
        elem.classList.toggle("nightMode");        
    });
       
    // document.querySelector("#nightModeBtn").textContent = "MODO DIURNO";   ESTO SE HACE CON LOCALSTORAGE
    
    document.querySelector("#containerTrending").classList.toggle("nightModeTrending");
});


// document.getElementById("nightModeBtn").addEventListener("click", () => {
//     const trendingNightMode = document.querySelector("#containerTrending");
//     trendingNightMode.classList.toggle("nightModeTrending");
    
// });             



//   elem.classList.toggle("titlesNightMode");    CAMBIAR COLOR H1S
// document.getElementById("nightModeBtn").addEventListener("click", () => {
//     titlesNightMode.forEach(elem => {
//         elem.classList.toggle("titlesNightMode");        
//     });
//     // document.querySelector("#containerTrending").classList.toggle("nightModeTrending");
// });



//HEADER:  cuando scrolleas aparece sombra en el header

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