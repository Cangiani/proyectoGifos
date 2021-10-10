// document.querySelector("#nightModeBtn").textContent = "MODO DIURNO";   ESTO SE HACE CON LOCALSTORAGE  ???
const toggleBtnNightMode = (ev) => {

    if (window.matchMedia('(min-width: 767px)').matches) {      //escritorio
        if (document.getElementById("nightModeBtn").textContent === "MODO DIURNO") {
            document.getElementById("nightModeBtn").textContent = "MODO NOCTURNO";
        } else {
            document.getElementById("nightModeBtn").textContent = "MODO DIURNO";
        }
    }else{
        if (document.getElementById("nightModeBtn").textContent === "Modo Diurno") {
            document.getElementById("nightModeBtn").textContent = "Modo Nocturno";
            // logo.src = "./images/logo-mobile-modo-noct.svg";                     //ARREGLAR LOGO
            // document.querySelector('.imglogo').src = "./css/images/Logo-modo-noc.svg";
        }else{
            document.getElementById("nightModeBtn").textContent = "Modo Diurno";    
        }
    }  
}  
document.querySelector('#nightModeBtn').addEventListener('click', toggleBtnNightMode)

const bodyNightMode =  document.querySelector("body");                    
const headerNightMode = document.querySelector("body > header");    
const navNightMode = document.querySelector("body > header > nav > ul > li");
const browserNightMode = document.querySelector(".home .browser"); 

const btnSearch = document.querySelector("#containerSearchGifos > .imageSearch");
const btnClose = document.querySelector("#containerSearchGifos > .closeSearch")

const divHomeNightMode = document.querySelector(".title h1"); 
const containerTrendingNight = document.querySelector("#containerTrending");
const containerFavoritesNight = document.querySelector("#containerFavorites");
const containerMisGifosNight = document.querySelector(".containerMisGifos");
const containerCreateGifosNight = document.querySelector("#containerCreateGifos");

const elementsNigthMode = [bodyNightMode, headerNightMode, navNightMode, browserNightMode, btnSearch, btnClose, divHomeNightMode, containerTrendingNight, containerFavoritesNight, containerMisGifosNight, containerCreateGifosNight];

document.getElementById("nightModeBtn").addEventListener("click", () => {

    elementsNigthMode.forEach(elem => {
        elem.classList.toggle("nightMode");  
        storeNightMode(elem.classList.contains('nightMode'));   //Si classList contiene ya el nightmodee regresa true, si no lo contiene devuelve false
        
        const localNightMode = localStorage.getItem('nightMode');
        if (localNightMode === 'true'){
            // img src="./images/logo-desktop.svg"                                               //cambiar logo
            document.querySelector(".closeSearch").src = "./images/close-modo-noct.svg";         //img cruz modo noct.
            document.querySelector(".imageSearch").src = "./images/icon-search-mod-noc.svg";     //img lupa modo noct.
            
            // document.querySelector("#containerCreateGifos > .animation .camara").src = "./images/camara-modo-noc.svg";
            // const lightCreate = document.querySelector("#containerCreateGifos .animation .light").src = "./images/camara-modo-noc.svg";
        }else {
            // img src="./images/logo-desktop.svg"                                               //cambiar logo
            document.querySelector("#containerSearchGifos > .closeSearch").src = "./images/close.svg";         //img cruz
            document.querySelector("#containerSearchGifos > .imageSearch").src = "./images/icon-search.svg";   //img lupa 
            // document.querySelector("#containerCreateGifos > .animation .camara").src = ".images/camara.svg";
        }
    });  
});

function loadNightMode() {
    const localNightMode = localStorage.getItem('nightMode');       
    if (!localNightMode){                                        //Si existe nightmode lo carga
        storeNightMode('false');
    }else if(localNightMode == 'true'){
        elementsNigthMode.forEach(elem => {
            elem.classList.toggle("nightMode");  
            // img src="./images/logo-desktop.svg"      //cambiar logo
            const localNightMode = localStorage.getItem('nightMode');
        if (localNightMode === 'true'){
            // img src="./images/logo-desktop.svg"                                               //cambiar logo
            document.querySelector("#containerSearchGifos > .closeSearch").src = "./images/close-modo-noct.svg";         //img cruz modo noct.
            document.querySelector("#containerSearchGifos > .imageSearch").src = "./images/icon-search-mod-noc.svg";     //img lupa modo noct.
        }else {
            // img src="./images/logo-desktop.svg"                                               //cambiar logo
            document.querySelector("#containerSearchGifos > .closeSearch").src = "./images/close.svg";         //img cruz modo noct.
            document.querySelector("#containerSearchGifos > .imageSearch").src = "./images/icon-search.svg";     //img lupa modo noct.
        }
        });  
    }                                                               
}

function storeNightMode (value) {
    localStorage.setItem('nightMode', value);
}

document.addEventListener("DOMContentLoaded", async () => {
    loadNightMode();
});