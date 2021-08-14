// SECCIÓN HOME --> BUSCADOR AUTOCOMPLETE
const API_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "u97suGng8xUtL28uyoZRwdmODNFgxzIY";

let suggestionLoading = false;                            // Semaforo del buscador search Gifos

const getSearchTags = async (apiKey, query) => {
  const API_URL_SEARCH = "https://api.giphy.com/v1/gifs/search/tags";
  try {
    const tags = await fetch(`${API_URL_SEARCH}?api_key=${apiKey}&q=${query}&limit=4`);
    return tags.json()
  } catch (error){
    console.log("ocurrio un error", error)
  }
}

const getSearchGifsByKeyword = async (keyword, offset) => {
  try {
    const tags = await fetch(`${API_URL}/search?api_key=${API_KEY}&q=${keyword}&offset=${offset*12}&limit=12`);
    return tags.json()
  } catch (error){
    console.log("ocurrio un error", error)
  }
}

const getGifs = (gifs) => {         

  gifs.data.forEach(gif => {
    const containerTrending = document.querySelector("#trendingGifos");
    const containerGifosSearch = document.createElement("div");
    containerGifosSearch.classList.add("singleGifo");
    containerGifosSearch.innerHTML = `
      <img class="singleImg" src="${gif.images.fixed_height.url}" alt="imgGifos">
      <div class="trendingInfo"> 
        <div class="hoverIcons">
          <a href="#"> <img data-id="${gif.id}" class="heart" src="./images/icon-fav.svg" alt="heart"></a>
          <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
          <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
        </div>
        <div class="pInfo">
          <p class="user">${gif.username}</p>
          <p class="title">${gif.title}</p> 
        </div>
      </div>`;
    containerTrending.appendChild(containerGifosSearch);     
  });

  //      Modal Expand
}


const getSuggestionsGifos = async (ev) => {
  const containerSuggestions = document.querySelector("#containerSuggestions");   
  containerSuggestions.innerHTML = "";       //para q sugerencias esten vacias y no se vayan concatenando un monton de li de las cosas que se busquen. blanquea 
  const containerGifs = document.querySelector('#showSearchGif');
  containerGifs.innerHTML = "";              //mantiene contenedor vacio, si se apreta enter se vacia de lo que tenia así no se acumula (cuando se vuelve a buscar algo, se borra los gifs que ya se habian buscado antes)
  const showTitle = document.querySelector("#titleGifs");
  showTitle.textContent = '';
  const divContainerSearch = document.querySelector(".search"); 

  if (ev.target.value.length < 3 && ev.keyCode !== 13){
    document.querySelector(".borderBottomSearch").style.display = "none";
    document.querySelector(".btnSearchGif").style.display = "none";
    divContainerSearch.classList.remove("searchActive");
  }

  if (ev.target.value.length >= 3 && ev.keyCode !== 13 && !suggestionLoading) { 
    suggestionLoading = true;
    const tags = await getSearchTags(API_KEY, ev.target.value);   
    document.querySelector(".btnSearchGif").style.display = "none";
    document.querySelector(".borderBottomSearch").style.display = "block";
    divContainerSearch.classList.add("searchActive");
    // divContainerSearch.appendChild(containerSuggestions);
    // <img src="./images/close.svg">

    tags.data.forEach(tag => {
      const newLi = document.createElement("li");
      newLi.textContent = tag.name; 
      containerSuggestions.appendChild(newLi);

        newLi.addEventListener("click", async (ev) =>{                      
          const gifClickeado = await getSearchGifsByKeyword(tag.name);
          document.querySelector(".borderBottomSearch").style.display = "none";
          divContainerSearch.classList.remove("searchActive");
          containerSuggestions.innerHTML = ""; 
          showTitle.textContent = tag.name;   
          showTitle.style.paddingTop = "2em"; 
          document.querySelector(".btnSearchGif").style.display = "block";
          document.querySelector(".home .subtitle").style.display = "none";

          gifClickeado.data.forEach(gif => {
            const newImg = document.createElement('img');
            newImg.setAttribute("src", gif.images.fixed_height.url) 
            containerGifs.appendChild(newImg);
          });
        })
    });
    suggestionLoading = false;
  }

  if (ev.keyCode === 13 || ev.keyCode == "Enter") {      //si presiona ENTER va a traer los gifs y los va a pintar
    
    const gifs = await getSearchGifsByKeyword(ev.target.value, 0); //0 significa la primer pagina (0*12,1*12,2*12...)
    showTitle.textContent = ev.target.value; 
    
    document.querySelector(".home .subtitle").style.display = "none";

    if(ev.target.value === ""){                   // NO FUNCIONA!!!
      
      const searchNoresult = () => {
        const divNoResult = document.createElement("div");
        divNoResult.classList.add("noResultSearchGifos");  
        divNoResult.innerHTML = `
        <div class="containerImgNoResult">
          <img src="./images/icon-busqueda-sin-resultado.svg" alt="noResult">
          <h3>Intenta con otra búsqueda.</h3>
        </div>`;
        document.querySelector(".btnSearchGif").style.display = "none";
        divContainerSearch.appendChild(divNoResult);
      }

    }else{
      document.querySelector(".borderBottomSearch").style.display = "none";
      document.querySelector(".btnSearchGif").style.display = "block";
      divContainerSearch.classList.remove("searchActive");
      containerSuggestions.innerHTML = ""; 
      showTitle.style.paddingTop = "2em";   
      const containerNewImg = document.querySelector("#showSearchGif");
      containerNewImg.style.paddingTop = "3em"; 

      gifs.data.forEach(gif => {

        const containerShowSearchGifs = document.querySelector("#showSearchGif");
        containerShowSearchGifs.classList.add("showSearchGif");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleImgSearch");
        imagesLatestGifos.innerHTML = `
        <img class="imgGifsSearch" src="${gif.images.fixed_height.url}" alt="imgGifos"> 
        <div class="searchInfo"> 
          <div class= "hoverIcons">
            <a href="#"> <img data-id="${gif.id}" class="heart" src="./images/icon-fav.svg" alt="heart"></a>
            <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
            <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
          </div>
          <div class="pInfo">
            <p class="user">${gif.username}</p>
            <p class="titleGifSearch">${gif.title}</p> 
          </div>
        </div>`
        containerShowSearchGifs.appendChild(imagesLatestGifos);

        //MODAL EXPAND
        const expandGif = imagesLatestGifos.querySelector('.btnExpand');
        expandGif.addEventListener("click", function() {
          showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
        });

      });
    }
  }
}
document.querySelector(".autocomplete").addEventListener("keyup", getSuggestionsGifos);   //buscador autocomplete
    
let clickCounter = 0;

const getMoreGifs = async () =>{
  clickCounter += 1;
  const inputSuggestions = document.querySelector("#searchGifos");
  const gifs = await getSearchGifsByKeyword(inputSuggestions.value, clickCounter);
  const containerNewImg = document.querySelector("#showSearchGif");
  
  gifs.data.forEach(gif => {
    
    const containerShowSearchGifs = document.querySelector("#showSearchGif");
    containerShowSearchGifs.classList.add("showSearchGif");
    const imagesLatestGifos = document.createElement("div");
    imagesLatestGifos.classList.add("singleImgSearch");
    imagesLatestGifos.innerHTML = `
    <img class="imgGifsSearch" src="${gif.images.fixed_height.url}" alt="imgGifos"> 
    <div class="searchInfo"> 
      <div class= "hoverIcons">
        <a href="#"> <img data-id="${gif.id}" class="heart" src="./images/icon-fav.svg" alt="heart"></a>
        <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
        <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
      </div>
      <div class="pInfo">
        <p class="user">${gif.username}</p>
        <p class="titleGifSearch">${gif.title}</p> 
      </div>
    </div>`
    containerShowSearchGifs.appendChild(imagesLatestGifos);

    //MODAL EXPAND
    const expandGif = imagesLatestGifos.querySelector('.btnExpand');
    expandGif.addEventListener("click", function() {
      showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
    });
  });
}

document.querySelector(".btnSearchGif").addEventListener("click", getMoreGifs);



//----------------------------------------------------MODAL-----------------------------------------------------

const showModalExpand = (img, id, user, title) => {
  
  const modal = document.querySelector(".modalShow");
  modal.style.display = "block";
  modal.innerHTML = `
  <a class= "btnCloseModal"> <img src="./images/close.svg"> </a>
  <div class= "containerImgExpand">
    <img class="modalImg" src="${img}" alt="imgGifos"> 
  </div>
  <div class="trendingExpand"> 
    <div class="hoverIcons">
      <a href="#"> <img data-id="${id}" class="heart" src="./images/icon-fav.svg" alt="heart"></a>
      <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
    </div>
    <div class="infoExpand">
      <p class="userExpand">${user}</p>
      <p class="titleExpand">${title}</p> 
    </div>
  </div>`;

  //CERRAR MODAL
  modal.querySelector(".btnCloseModal").addEventListener("click", () => {
    modal.style.display = "none";
  });

  //FAVORITES

  //DOWNLOAD 
}