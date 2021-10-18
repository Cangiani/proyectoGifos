let suggestionLoading = false;                            // Semaforo del buscador search Gifos

const getSearchTags = async (apiKey, query) => {            //get search
  const API_URL_SEARCH = "https://api.giphy.com/v1/gifs/search/tags";
  try {
    const tags = await fetch(`${API_URL_SEARCH}?api_key=${apiKey}&q=${query}&limit=4`);
    return tags.json()
  } catch (error){
    console.log("ocurrio un error", error)
  }
}

const getSearchGifsByKeyword = async (keyword, offset) => {   //input suggestions
  try {
    const tags = await fetch(`${API_URL}/search?api_key=${API_KEY}&q=${keyword}&offset=${offset*12}&limit=12`);
    return tags.json()
  } catch (error){
    console.log("ocurrio un error", error)
  }
}

const deleteInput = () => {
  document.getElementById("searchGifos").value = "";
  document.querySelector(".borderBottomSearch").style.display = "none";
  document.querySelector(".btnSearchGif").style.display = "none";
  const containerSuggestions = document.querySelector("#containerSuggestions");   
  containerSuggestions.innerHTML = ""; 
  const divContainerSearch = document.querySelector(".search"); 
  divContainerSearch.classList.remove("searchActive");
}

let clickCounter = 0;

const getMoreGifs = async () =>{
  clickCounter += 1;
  const inputSuggestions = document.getElementById('searchGifos');
  const gifs = await getSearchGifsByKeyword(inputSuggestions.value, clickCounter);
  
  gifs.data.forEach(gif => {
    const containerShowSearchGifs = document.querySelector("#showSearchGif");
    containerShowSearchGifs.classList.add("showSearchGif");
    const imagesLatestGifos = document.createElement("div");
    imagesLatestGifos.classList.add("singleImgSearch");
    imagesLatestGifos.innerHTML = `
    <img class="imgGifsSearch" src="${gif.images.fixed_height.url}" alt="imgGifos"> 
    <div class="searchInfo"> 
      <div class= "hoverIcons">
        <a href="#" class="btnHeart">
          <img 
            data-id="${gif.id}" 
            data-url="${gif.images.fixed_height.url}" 
            data-user="${gif.username}" 
            data-title="${gif.title}"
            src="./images/icon-fav.svg" 
            alt="heart">
        </a>
        <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
        <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
      </div>
      <div class="pInfo">
        <p class="user">${gif.username}</p>
        <p class="titleGifSearch">${gif.title}</p> 
      </div>
    </div>`
    containerShowSearchGifs.appendChild(imagesLatestGifos);

    imagesLatestGifos.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler); // FAVORITES

    if(window.matchMedia("(max-width: 768px)").matches){               //MOBILE
      imagesLatestGifos.querySelector('.imgGifsSearch').addEventListener("click", function() {
        showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
      });
    }else{
      const expandGif = imagesLatestGifos.querySelector('.btnExpand');            //MODAL EXPAND
      expandGif.addEventListener("click", function() {
        showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
      });
    }
  });
}
const inputSuggestions = document.getElementById('searchGifos');

const getSuggestionsGifos = async (ev) => {
  
  const btnCruz = document.querySelector(".closeSearch");
  btnCruz.style.display = "block";                                      //img cruz
  btnCruz.addEventListener("click", deleteInput);
  document.querySelector(".imageSearch").style.display = "none";        //img lupa

  const containerSuggestions = document.querySelector("#containerSuggestions");   
  containerSuggestions.innerHTML = "";       //para q sugerencias esten vacias y no se vayan concatenando un monton de li de las cosas que se busquen. blanquea 
  const containerGifs = document.querySelector('#showSearchGif');
  containerGifs.classList.add("showSearchGif");
  containerGifs.innerHTML = "";              //mantiene contenedor vacio, si se apreta enter se vacia de lo que tenia así no se acumula (cuando se vuelve a buscar algo, se borra los gifs que ya se habian buscado antes)
  const showTitle = document.querySelector("#titleGifs");
  showTitle.textContent = '';
  const divContainerSearch = document.querySelector(".search"); 

  if (ev.target.value.length < 3 && ev.keyCode !== 13){
    // document.querySelector("#showSearchGif").style.display = "none";
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
          const containerGifs = document.querySelector('#showSearchGif');
          containerGifs.classList.add("showSearchGif");
          const imagesLatestGifos = document.createElement("div");
          imagesLatestGifos.classList.add("singleImgSearch");
          imagesLatestGifos.innerHTML = `
          <img class="imgGifsSearch" src="${gif.images.fixed_height.url}" alt="imgGifos"> 
          <div class="searchInfo"> 
            <div class= "hoverIcons">
              <a href="#" class="btnHeart">
                <img 
                  data-id="${gif.id}" 
                  data-url="${gif.images.fixed_height.url}" 
                  data-user="${gif.username}" 
                  data-title="${gif.title}"
                  src="./images/icon-fav.svg" 
                  alt="heart">
              </a>
              <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
              <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="pInfo">
              <p class="user">${gif.username}</p>
              <p class="titleGifSearch">${gif.title}</p> 
            </div>
          </div>`;
          containerGifs.appendChild(imagesLatestGifos);

          imagesLatestGifos.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler); //FAVORITES
  
          if(window.matchMedia("(max-width: 768px)").matches){               //MOBILE
            imagesLatestGifos.querySelector('.imgGifsSearch').addEventListener("click", function() {
              showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
            });
          }else{
            const expandGif = imagesLatestGifos.querySelector('.btnExpand');            //MODAL EXPAND
            expandGif.addEventListener("click", function() {
              showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
            });
          }

          const downloadMyGifo = async (ev) => {                                    //DOWNLOAD
            let downloadUrl = await fetch(`https://media2.giphy.com/media/${gif.id}/giphy.gif`);
            let file = await downloadUrl.blob();  
            const anchor = document.createElement('a');  
            const urlGifs = URL.createObjectURL(file);
            anchor.href = urlGifs;
            anchor.download = `${gif.title}.gif`;
            anchor.style = 'display: "none"';
            document.body.appendChild(anchor);
            anchor.click();                              
            document.body.removeChild(anchor);
          };
          imagesLatestGifos.querySelector('.downloadIcon').addEventListener("click", downloadMyGifo);
        });
        document.querySelector(".btnSearchGif").style.display = "block";
        document.querySelector(".btnSearchGif").addEventListener("click", getMoreGifs);     
      });
    });
    suggestionLoading = false;
  }

  if (ev.keyCode === 13 || ev.keyCode == "Enter") {      //presiona ENTER, trae los gifs y los pinta
    
    const gifs = await getSearchGifsByKeyword(ev.target.value, 0); //0 significa la primer pagina (0*12,1*12,2*12...)
    showTitle.textContent = ev.target.value; 
    document.querySelector(".home .subtitle").style.height = "14em";

    const tags = await getSearchTags(API_KEY, ev.target.value); 
    if(ev.target.value === "" || tags.data.length === 0 ){             
      document.querySelector(".showSearchGif").classList.remove("showSearchGif");
      divContainerSearch.classList.remove("searchActive");
      document.querySelector(".borderBottomSearch").style.display = "none";

      const divNoResult = document.createElement("div");
      divNoResult.classList.add("noResultSearchGifos");  
      divNoResult.innerHTML = `
      <div class="containerImgNoResult">
        <img src="./images/icon-busqueda-sin-resultado.svg" alt="noResult">
        <h3>Intenta con otra búsqueda.</h3>
      </div>`;
      document.querySelector(".btnSearchGif").style.display = "none";
      divContainerSearch.appendChild(divNoResult);

    }else{
      const containerShowSearchGifs = document.querySelector(".showSearchGif");
      containerShowSearchGifs.classList.add("showSearchGif");
      //divNoResult.classList.remove = ("noResultSearchGifos");
      //divNoResult.innerHTML = "";
      //document.querySelector(".noResultSearchGifos").style.display = "none";

      document.querySelector(".borderBottomSearch").style.display = "none";
      divContainerSearch.classList.remove("searchActive");
      containerSuggestions.innerHTML = ""; 
      showTitle.style.paddingTop = "2em";   
      containerShowSearchGifs.style.paddingTop = "3em"; 

      gifs.data.forEach(gif => {
        containerShowSearchGifs.classList.add("showSearchGif");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleImgSearch");
        imagesLatestGifos.innerHTML = `
        <img class="imgGifsSearch" src="${gif.images.fixed_height.url}" alt="imgGifos"> 
        <div class="searchInfo"> 
          <div class= "hoverIcons">
            <a href="#" class="btnHeart">
              <img 
                data-id="${gif.id}" 
                data-url="${gif.images.fixed_height.url}" 
                data-user="${gif.username}" 
                data-title="${gif.title}"
                src="./images/icon-fav.svg" 
                alt="heart">
            </a>
            <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
            <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
          </div>
          <div class="pInfo">
            <p class="user">${gif.username}</p>
            <p class="titleGifSearch">${gif.title}</p> 
          </div>
        </div>`;
        containerShowSearchGifs.appendChild(imagesLatestGifos);

        imagesLatestGifos.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler); //FAVORITES

        if(window.matchMedia("(max-width: 768px)").matches){               //MOBILE
          imagesLatestGifos.querySelector('.imgGifsSearch').addEventListener("click", function() {
            showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
          });
        }else{
          const expandGif = imagesLatestGifos.querySelector('.btnExpand');            //MODAL EXPAND
          expandGif.addEventListener("click", function() {
            showModalExpand(gif.images.fixed_height.url, gif.id, gif.username, gif.title);
          });
        }

        const downloadMyGifo = async (ev) => {                                    //DOWNLOAD
          let downloadUrl = await fetch(`https://media2.giphy.com/media/${gif.id}/giphy.gif`);
          let file = await downloadUrl.blob();  
          const anchor = document.createElement('a');  
          const urlGifs = URL.createObjectURL(file);
          anchor.href = urlGifs;
          anchor.download = `${gif.title}.gif`;
          anchor.style = 'display: "none"';
          document.body.appendChild(anchor);
          anchor.click();                              
          document.body.removeChild(anchor);
        };
        imagesLatestGifos.querySelector('.downloadIcon').addEventListener("click", downloadMyGifo);
      });
      document.querySelector(".btnSearchGif").style.display = "block";
      document.querySelector(".btnSearchGif").addEventListener("click", getMoreGifs);     
    }
  }
}
if (inputSuggestions !== null) {
  inputSuggestions.addEventListener("keyup", getSuggestionsGifos);   //buscador autocomplete
}

//Expand Desktop
const showModalExpand = (img, id, user, title) => {
  
  const modalExpand = document.createElement("div");
  modalExpand.classList.add("modalShow");
  modalExpand.style.display = "block";
  modalExpand.innerHTML = `
  <a class= "btnCloseModal"> <img src="./images/close.svg"> </a>
  <div class= "containerImgExpand">
    <img class="modalImg" src="${img}" alt="imgGifos"> 
  </div>
  <div class="trendingExpand"> 
    <div class="hoverIcons">
      <a href="#" class="btnHeart"> <img data-id="${id}" data-url="${img}" data-user="${user}" data-title="${title}" src="./images/icon-fav.svg" alt="heart"> </a>
      <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
    </div>
    <div class="infoExpand">
      <p class="userExpand">${user}</p>
      <p class="titleExpand">${title}</p> 
    </div>
  </div>`;
  if (document.querySelector('#containerTrending')) {
    document.querySelector('#containerTrending').appendChild(modalExpand);
  } else if (document.querySelector('#containerFavorites')) {
    document.querySelector('#containerFavorites').appendChild(modalExpand);
  } else if (document.querySelector('.containerMisGifos')) {
    document.querySelector('.containerMisGifos').appendChild(modalExpand);
  }                   
  modalExpand.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler);     // FAVORITES 

  modalExpand.querySelector(".btnCloseModal").addEventListener("click", () => {        //CERRAR MODAL
    modalExpand.style.display = "none";
  });

  const downloadGif = async (ev) => {                              //  DOWNLOAD
    let downloadUrl = await fetch(`https://media2.giphy.com/media/${id}/giphy.gif`);
    let file = await downloadUrl.blob();
    const anchor = document.createElement("a");
    const urlGifs = URL.createObjectURL(file);
    anchor.href = urlGifs;
    anchor.download = `${title}.gif`;
    document.body.appendChild(anchor);
    anchor.click(); 
    document.body.removeChild(anchor);
  };
  modalExpand.querySelector(".downloadIcon").addEventListener("click", downloadGif);
}

//Expand Mobile
const showModalExpandMobile = (img, id, user, title) => {

  if(window.matchMedia("(max-width: 768px)").matches){
      const modalExpand = document.createElement("div");
      modalExpand.classList.add("modalShow");
      modalExpand.style.display = "block";
      modalExpand.innerHTML = `
      <a class= "btnCloseModal"> <img src="./images/close.svg"> </a>
      <div class= "containerImgExpand">
        <img class="modalImg" src="${img}" alt="imgGifos"> 
      </div>
      <div class="trendingExpand"> 
        <div class="hoverIcons">
          <a href="#" class="btnHeart"> <img data-id="${id}" data-url="${img}" data-user="${user}" data-title="${title}" src="./images/icon-fav.svg" alt="heart"> </a>
          <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
        </div>
        <div class="infoExpand">
          <p class="userExpand">${user}</p>
          <p class="titleExpand">${title}</p> 
        </div>
      </div>`;
      if (document.querySelector('#containerTrending')) {
          document.querySelector('#containerTrending').appendChild(modalExpand);
      } else if (document.querySelector('#containerFavorites')) {
          document.querySelector('#containerFavorites').appendChild(modalExpand);
      } else if (document.querySelector('.containerMisGifos')) {
          document.querySelector('.containerMisGifos').appendChild(modalExpand);
      }                   
      modalExpand.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler);     // FAVORITES 

      modalExpand.querySelector(".btnCloseModal").addEventListener("click", () => {        //CERRAR MODAL
          modalExpand.style.display = "none";
      });

      const downloadGif = async (ev) => {                              //  DOWNLOAD
          let downloadUrl = await fetch(`https://media2.giphy.com/media/${id}/giphy.gif`);
          let file = await downloadUrl.blob();
          const anchor = document.createElement("a");
          const urlGifs = URL.createObjectURL(file);
          anchor.href = urlGifs;
          anchor.download = `${title}.gif`;
          document.body.appendChild(anchor);
          anchor.click(); 
          document.body.removeChild(anchor);
      };
      modalExpand.querySelector(".downloadIcon").addEventListener("click", downloadGif);
  }
}

// const getGifs = (gifs) => {         
//   gifs.data.forEach(gif => {
//     const containerTrending = document.querySelector("#trendingGifos");
//     const containerGifosSearch = document.createElement("div");
//     containerGifosSearch.classList.add("singleGifo");
//     containerGifosSearch.innerHTML = `
//       <img class="singleImg" src="${gif.images.fixed_height.url}" alt="imgGifos">
//       <div class="trendingInfo"> 
//         <div class="hoverIcons">
//           <a href="#" class="btnHeart"> <img data-id="${gif.id}"  src="./images/icon-fav.svg" alt="heart"></a>
//           <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
//           <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
//         </div>
//         <div class="pInfo">
//           <p class="user">${gif.username}</p>
//           <p class="title">${gif.title}</p> 
//         </div>
//       </div>`;
//     containerTrending.appendChild(containerGifosSearch);  
// }