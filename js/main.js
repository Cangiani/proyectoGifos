// MAIN.JS -> logica de inicializacion puntual de la aplicacion (dom contentloaded y eventlisteners iniciales)
//en main solo agregar eventos

const API_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "u97suGng8xUtL28uyoZRwdmODNFgxzIY";
// https://api.giphy.com/v1/gifs/search/tags?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY
// trending: https://api.giphy.com/v1/gifs/trending?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY&limit=3&rating=g


let clickCounter = 0;

const getMoreGifs = async () =>{
    clickCounter += 1;
    const inputSuggestions = document.querySelector("#searchGifos");
    const gifs = await getSearchGifsByKeyword(inputSuggestions.value, clickCounter);
    const containerNewImg = document.querySelector("#showSearchGif");
    
    gifs.data.forEach(gif => {
        const newImg = document.createElement('img');
        newImg.setAttribute("src", gif.images.fixed_height.url) 
        containerNewImg.appendChild(newImg);
    });
}

//TRENDING GIFOS:
//en cada pagina de html que se repita el trendingGifos tengo que copiar el script de trending, no el codigo.

const getTrendingGifos = async () => {
    try {
        const gifs = await fetch(`${API_URL}/trending?api_key=${API_KEY}&limit=3&rating=g`);
        return gifs.json()
    } catch (error) {
        console.log("ocurrio un error",error)
    }
}



// const showModal = (ev) => {
//     // parametros -->  trendingUrl, username, title
//     // imagesLatestGifos.querySelector(".singleImg") = ev.target.src;

//     const modal = document.createElement("div");
//     modal.classList.add("modalShow");
//     modal.innerHTML = `
//     <a class="btnCloseModal"> <img src="./images/close.svg"> </a>

//     `  
    // <div class=gifExpand>
    //     <img class="modalImg" src="${trendingUrl}"">
    // </div>
    // <div class="info">
    //     <p class="user">User: ${username}</p>
    //     <p class="title">Título: ${title}</p> 
    //     <a class="heart"> <img src="./images/icon-fav.svg" alt="heart"> </a>
    //     <a class="downloadIcon"> <img src="./images/icon-download.svg" alt="download"> </a>
    // </div>
    // modal.style.display = "block";
    // const btnModal = document.querySelector(".btnCloseModal")
    // btnModal.addEventListener("click", closeModal);
// }

//const closeModal = (ev) =>{
//    const xClickeada = ev.target;
//   modal.style.display = "none";
//     xClickeada.closest('#modal').classList.remove('modalShow');
// }


const trendingHover = (ev) => {
    ev.target.classList.toggle("trendingHover");
    // const icons = document.querySelector(".trendingInfo .hover")
    document.querySelector("#trendingGifos .pInfo").style.display = "block";
}
const trendingHideHover = (ev) => {
    ev.target.classList.toggle("trendingHover");
    document.querySelector("#trendingGifos .pInfo").style.display = "none";
}


document.addEventListener("DOMContentLoaded", async () => {
    const imagesApiTrending = await getTrendingGifos();
      
    const trendingImages = imagesApiTrending.data.map(async trending => {                
        
        const trendingUrl = trending.images.fixed_height.url;           //?????

        const containerTrending = document.querySelector("#trendingGifos");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleGifo");
        imagesLatestGifos.innerHTML = `
        <img class="singleImg" src="${trendingUrl}" alt="imgGifos">
        <div class="trendingInfo"> 
            <div class="hoverIcons>
                <a class="heart"> <img src="./images/icon-fav.svg" alt="heart"> </a>
                <a class="downloadIcon"> <img src="./images/icon-download.svg" alt="download"> </a>
                <a class="expand"> <img src="./images/icon-max-normal.svg" alt="max"> </a>
            </div>
            <div class="pInfo">
                <p class="user">${trending.username}</p>
                <p class="title">${trending.title}</p> 
            </div>
        </div>`
        containerTrending.appendChild(imagesLatestGifos);
    })

    // imagesLatestGifos.querySelector(".trendingInfo .expand img").addEventListener("click", showModal);
        
    document.querySelector("#trendingGifos .singleGifo .pInfo").addEventListener("mouseover", trendingHover);     //o mousemove??
    document.querySelector("#trendingGifos .singleGifo .pInfo").addEventListener("mouseout", trendingHideHover);
    
    //los escuchadores de eventos tienen que estar en la función que pinta/trae los gifs

    document.querySelector(".autocomplete").addEventListener("keyup", getSuggestionsGifos);   //buscador autocomplete
    
    document.querySelector(".btnSearchGif").addEventListener("click", getMoreGifs);
})

// DOWNLOAD GIF
// (async () => {
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



//LOCAL STORAGE:

// const favoritesGifos = () => {
//     if(localStorage.getItem("favoritos")){
//         //si existe:
//     }else {
//         localStorage.setItem("favoritos",[])
//     }
// }



//MODO NOCTURNO

//el boton "modo nocturno" tiene que decir "modo diurno"

const bodyNightMode =  document.querySelector("body");                    
const headerNightMode = document.querySelector("body > header");    
const navBarNightMode = document.querySelector("body > header > nav > ul");
const divHomeNightMode = document.querySelector("body > main > .home");   
const elementsNigthMode = [bodyNightMode, headerNightMode, navBarNightMode, divHomeNightMode];

const titleTrendingNocturno = document.querySelector("body > main > .trendingTitle");   
const sliderTrendingNocturno = document.querySelector("body > main > .sliderGifos");
const trendingNight = [titleTrendingNocturno, sliderTrendingNocturno];

const liNightMode =  document.querySelector("body > header > nav > ul > li"); 

document.getElementById("nightModeBtn").addEventListener("click", () => {
    elementsNigthMode.forEach(elem => {
        elem.classList.toggle("nightMode");        
    });
       
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