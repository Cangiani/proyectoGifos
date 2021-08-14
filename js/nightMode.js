// document.querySelector("#nightModeBtn").textContent = "MODO DIURNO";   ESTO SE HACE CON LOCALSTORAGE  ???
const toggleBtnNightMode = (ev) => {
    if (document.getElementById("nightModeBtn").textContent === "MODO DIURNO") {
        document.getElementById("nightModeBtn").textContent = "MODO NOCTURNO";
    } else {
        document.getElementById("nightModeBtn").textContent = "MODO DIURNO";
    }
}  
document.querySelector('#nightModeBtn').addEventListener('click', toggleBtnNightMode)


const bodyNightMode =  document.querySelector("body");                    
const headerNightMode = document.querySelector("body > header");    
const navNightMode = document.querySelector("body > header > nav > ul > li");
const browserNightMode = document.querySelector(".home .browser"); 
const divHomeNightMode = document.querySelector(".title h1"); 
const containerTrendingNight = document.querySelector("#containerTrending");

const elementsNigthMode = [bodyNightMode, headerNightMode, navNightMode, browserNightMode, divHomeNightMode, containerTrendingNight ];

document.getElementById("nightModeBtn").addEventListener("click", () => {

    elementsNigthMode.forEach(elem => {
        elem.classList.toggle("nightMode");        
    });    
});