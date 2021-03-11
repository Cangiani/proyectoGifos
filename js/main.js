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

// const showModal=  (ev) => {
//     document.querySelector("#modal img").src = ev.target.src    //ese ev.target se refiere a la img que se clikea
//     document.querySelector("#modal").classList.add("show");
// }

document.addEventListener("DOMContentLoaded", async () => {
    
    const API_URL = "https://api.giphy.com/v1/gifs/trending";
    const API_KEY =  "u97suGng8xUtL28uyoZRwdmODNFgxzIY"; 
    const imagesApiTrending = await getTrendingGifos(API_URL,API_KEY);
      
    const trendingImages = imagesApiTrending.data.map(async trending => {                
        const containerTrending = document.querySelector("#trendingGifos");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add(".singleGifo");
        imagesLatestGifos.innerHTML = `
        <img src="${trending.images.fixed_height.url}" alt="">
        <div class="trendingInfo">
            <div class="contentInfo>
                <div class="hoverIcons>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                </div>

                <p>User: ${trending.username}</p>
                <p>Título: ${trending.title}</p>
            </div>  
        </div>`
        containerTrending.appendChild(imagesLatestGifos);

        // imagesLatestGifos.querySelector("img").addEventListener("click",showModal);
    })
})


// const closeModal = (ev) =>{
  
//     const xClickeada = ev.target;
//     xClickeada.closest('#modal').classList.remove('show');
// }
  
// addEventListener("click", closeModal);
  

// const gifsTrending = (containerTrending) => {

//     const imagesApiTrending.data.forEach(url => {
//     const baseGifs = document.createElement("div");
//     baseGifs.classList.add(".latestGifos");
//     baseGifs.innerHTML= `<img src="${imagesApiTrending.data.url}">`
//     containerTrending.appendChild(baseGifs);   
//     });
// }

// const getTrendingGifos =  async (apiUrl,apiKey,query) => {
//     try {
//         const gifs = await fetch(`${apiUrl}?api_key=${apiKey}&q=${query}`);
//         return gifs.json()
//     } catch (error) {
//         console.log("ocurrio un error",error)
//     }
// }

// const getSuggestionsGifos = async (ev) => {

//     // const API_URL = "https://api.giphy.com/v1/gifs/trending";   
//     // const API_KEY =  "u97suGng8xUtL28uyoZRwdmODNFgxzIY";     

//     const contenedorTrendingGifos = document.querySelector(".trendingGifos");
//     // contenedorTrendingGifos.innerHTML = "<img src="${trendingUrl}">";           //HACER TRENDINGURL

//     if(ev.target.value.length >= 3) {
//         const gifs = await getSearchTags(API_URL,API_KEY,ev.target.value);
//         gifs.data.forEach(tag => {
//             const newDiv = document.createElement("div");
//             newDiv.textContent = tag.name;                  //?????????
//             contenedorTrendingGifos.appendChild(newLi);
//         });
//     }
// }





// BUSCADOR AUTOCOMPLETE:
// const getSearchTags =  async (apiUrl,apiKey,query) => {
//     try {
//       const tags = await fetch(`${apiUrl}?api_key=${apiKey}&q=${query}`);
//       return tags.json()
//     } catch (error) {
//       console.log(“ocurrio un error”,error)
//     }
//   }

//   const getSuggestionsHanlder = async (ev) => {
//   const API_URL = “https://api.giphy.com/v1/gifs/search/tags”;
//   const API_KEY =  “njNQb2Nze90CQHCQ6vzAc5R1ZAJH3AYA”;
//     const contenedorSugerencias = document.querySelector(‘#lista-sugerencias’);
//     contenedorSugerencias.innerHTML = ‘’;                    //para que las sugerencias esten vacias y no se vayan concatenando un monton de li de las cosas que se busquen. blanquea
//     if(ev.target.value.length >= 3) {                        //cuando se presiona tres letras
//         const tags = await getSearchTags(API_URL,API_KEY,ev.target.value);   //el ev.target.value es lo que el usuario escribió en el input
//         tags.data.forEach(tag => {
//           const newLi = document.createElement(‘li’);
//           newLi.textContent = tag.name;
//           contenedorSugerencias.appendChild(newLi);
//         });
//     }
//   }
//   document.addEventListener(‘DOMContentLoaded’,async () => {
//     document.querySelector(‘.autocomplete’).addEventListener(‘keyup’,getSuggestionsHanlder);
//   });






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