// MAIN.JS



//trending gifos

//en cada pagina de html que se repita el trendingGifos tengo que copiar el script de trending, no el codigo.

const getTrendingGifos = async (apiUrl,apiKey) => {
    try {
        const gifs = await fetch(`${apiUrl}?api_key=${apiKey}&limit=3&rating=g`);
        return gifs.json()
    } catch (error) {
        console.log("ocurrio un error",error)
    }
}
// const getTrendingGifos =  async (apiUrl,apiKey,query) => {
//     try {
//         const gifs = await fetch(`${apiUrl}?api_key=${apiKey}&q=${query}`);
//         return gifs.json()
//     } catch (error) {
//         console.log("ocurrio un error",error)
//     }
// }

// const showModal=  (ev) => {
//     document.querySelector("#modal img").src = ev.target.src    //ese ev.target se refiere a la img que se clikea
//     document.querySelector("#modal").classList.add("show");
// }


// BUSCADOR AUTOCOMPLETE:

const getSearchTags =  async (apiKey,query) => {
    const API_URL = "https://api.giphy.com/v1/gifs/search/tags";
    try {
      const tags = await fetch(`${API_URL}?api_key=${apiKey}&q=${query}`);
      return tags.json()
    } catch (error) {
      console.log("ocurrio un error",error)
    }
}

const getSearchGifsByKeyword =  async (apiKey,keyword) => {
    const API_URL = "https://api.giphy.com/v1/gifs/search";
    try {
      const tags = await fetch(`${API_URL}?api_key=${apiKey}&q=${keyword}&limit=12`);
      return tags.json()
    } catch (error) {
      console.log("ocurrio un error",error)
    }
}

const getSuggestionsGifos = async (ev) => {
    // const API_URL = "https://api.giphy.com/v1/gifs/search/tags";
    const API_KEY =  "u97suGng8xUtL28uyoZRwdmODNFgxzIY";

    const containerSuggestions = document.querySelector("#searchGifos");
    const containerGifs = document.querySelector('#listGifs');
    containerSuggestions.innerHTML = "";                    //para que las sugerencias esten vacias y no se vayan concatenando un monton de li de las cosas que se busquen. blanquea
    containerGifs.innerHTML = "";                     //matiene el contenedor vacio, cuando se apreta enter se vacia de lo que tenia así no se acumula (cuando se vuelve a buscar algo, se borra los gifs que ya se habian buscado antes)

    if(ev.target.value.length >= 3 && ev.keyCode !== '13') {                        //cuando se presiona tres letras
        const tags = await getSearchTags(API_KEY,ev.target.value);   //el ev.target.value es lo que el usuario escribió en el input
        tags.data.forEach(tag => {
            const newLi = document.createElement("li");
            newLi.textContent = tag.name;
            containerSuggestions.appendChild(newLi);
        });
    }
    if (ev.keyCode === 13) {                 //significa que si presiona ENTER va a traer los gifs y los va a pintar
        const gifs = await getSearchGifsByKeyword(API_KEY,ev.target.value);
        gifs.data.forEach(gif => {
            const containerNewImg = document.createElement("div");
            containerNewImg.classList.add("containSearchGif");
            const newImg = document.createElement('img');
            newImg.setAttribute("src",gif.images.fixed_height.url) 
            containerNewImg.appendChild(newImg);
            containerGifs.appendChild(containerNewImg);
        });
    }
    //BUSQUEDA SIN RESULTADO, QUE APAREZCA LA IMAGEN:
    //                                                 NO FUNCIONA!!!!!!!!!!!!!!!!!!!!!!
    if(ev.target === null){
        const messageSearch = document.createElement("h3");
        messageSearch.classList.add(".noResultSearchGifos")
        messageSearch.textContent = "Intenta con otra búsqueda.";
    }
}

// BOTON VER MAS NO FUNCIONA

// const btnVerMasGifos = document.querySelector(".btn-suggestions-gifos");
// const btnVerMas = document.createElement("button");
// // btnVerMas.classList.add("btn-suggestions-gifos");
// btnVerMas.innerText = "VER MÁS";
// containerNewImg.appendChild(btnVerMas);

// btnVerMasGifos.addEventListener("click", (ev)=> {
//     const containerBtnGifos = document.querySelector('#listGifs');
//     getSuggestionsGifos(containerBtnGifos);
// });

//                                         otra opcion:
// const verMas = (ev) => {
//     offsetPokemon += 3;
//     getPokemonesGeneral();
// }

// //create botón "ver mas"
// const createButton = () => {
//     const main = document.querySelector('.main')
//     const verMasBtn = document.createElement("BUTTON");
//     verMasBtn.classList.add("buttonVerMas");   
//     verMasBtn.innerHTML = "Ver más";   
//     main.appendChild(verMasBtn)

//     verMasBtn.addEventListener('click', verMas)
// }



document.addEventListener("DOMContentLoaded", async () => {
    
    const API_URL = "https://api.giphy.com/v1/gifs/trending";
    const API_KEY =  "u97suGng8xUtL28uyoZRwdmODNFgxzIY"; 
    const imagesApiTrending = await getTrendingGifos(API_URL,API_KEY);
      
    const trendingImages = imagesApiTrending.data.map(async trending => {                
        const containerTrending = document.querySelector("#trendingGifos");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleGifo");
        imagesLatestGifos.innerHTML = `
        <img class="singleImg" src="${trending.images.fixed_height.url}" alt="">
        <div class="trendingInfo">
            <div class="hoverIcons>
                <img src="./images/icon-fav.svg" alt="heart">
                <img src="./images/icon-fav.svg" alt="heart">
                <img src="./images/icon-download.svg" alt="download">
                <img src="./images/icon-max-normal.svg" alt="max">
            </div>
            <p class="user">User: ${trending.username}</p>
            <p class="title">Título: ${trending.title}</p> 
        </div>`
        containerTrending.appendChild(imagesLatestGifos);

        // imagesLatestGifos.querySelector("img").addEventListener("click",showModal);
    })

    // createButton()
    document.querySelector(".autocomplete").addEventListener("keyup",getSuggestionsGifos);   //buscador autocomplete
})

//      NO   FUNCIONA     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Para que aparezcan los botones sobre los gifs del trending:
const showInfoTrending = (ev) => {
    ev.target.style.color = "#572EE5";
    ev.target.style.display = 'block';
};
const showMouseover = document.querySelector("#trendingGifos .trendingInfo");
showMouseover.addEventListener('mouseover', showInfoTrending); 



// const closeModal = (ev) =>{
  
//     const xClickeada = ev.target;
//     xClickeada.closest('#modal').classList.remove('show');
// }
  
// addEventListener("click", closeModal);
  



//LOCAL STORAGE:

// const favoritesGifos = () => {
//     if(localStorage.getItem("favoritos")){
//         //si existe:
//     }else {
//         localStorage.setItem("favoritos",[])
//     }
// }




//MODO NOCTURNO

// const bodyContainer =  document.querySelector('body');                      //body
// const headerNocturno = document.querySelector('header');                    //header
// const divHomeNocturno = document.querySelector('main > .home');     //home (bground principal)
// const divTrendingNocturno = document.querySelector('main > .tendingGifos')

// const elementsNigthMode = [bodyContainer, headerNocturno, divHomeNocturno, divTrendingNocturno];

// document.getElementById("nightMode").addEventListener("click", () => {
//     elementsNigthMode.forEach(elem => {
//         elem.classList.toggle('nightMode');              //establecer caracteristicas de night-mode????????
//         console.log("nightMode", elementsNigthMode);
//     });
// });


// document.addEventListener('sticky-change', e => {
//     const header = e.detail.target;  // header became sticky or stopped sticking.
//     const sticking = e.detail.stuck; // true when header is sticky.
//     header.classList.toggle('shadow', sticking); // add drop shadow when sticking.
  
//     document.querySelector('.who-is-sticking').textContent = header.textContent;
//   });