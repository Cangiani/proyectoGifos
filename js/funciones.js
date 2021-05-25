// SECCIÓN HOME

// BUSCADOR AUTOCOMPLETE:
const getSearchTags = async (apiKey, query) => {
    const API_URL_SEARCH = "https://api.giphy.com/v1/gifs/search/tags";
    try {
      const tags = await fetch(`${API_URL_SEARCH}?api_key=${apiKey}&q=${query}&limit=4`);
      return tags.json()
    } catch (error) {
      console.log("ocurrio un error", error)
    }
}

const getSearchGifsByKeyword = async (keyword, offset) => {
    try {
      const tags = await fetch(`${API_URL}/search?api_key=${API_KEY}&q=${keyword}&offset=${offset*12}&limit=12`);
      return tags.json()
    } catch (error) {
      console.log("ocurrio un error", error)
    }
}

const getSuggestionsGifos = async (ev) => {
    const containerSuggestions = document.querySelector("#containerSuggestions");   
    containerSuggestions.innerHTML = "";       //para que las sugerencias esten vacias y no se vayan concatenando un monton de li de las cosas que se busquen. blanquea 
    const containerGifs = document.querySelector('#showSearchGif');
    containerGifs.innerHTML = "";              //mantiene el contenedor vacio, cuando se apreta enter se vacia de lo que tenia así no se acumula (cuando se vuelve a buscar algo, se borra los gifs que ya se habian buscado antes)
    const showTitle = document.querySelector("#titleGifs");
    showTitle.textContent = '';

    const divContainerSearch = document.querySelector(".search"); 

    if (ev.target.value.length >= 3 && ev.keyCode !== 13) {  //cuando presiona 3 letras  || ev.keyCode !== "Enter")
      const tags = await getSearchTags(API_KEY, ev.target.value);   
      document.querySelector(".borderBottomSearch").style.display = "block";

      tags.data.forEach(tag => {
        const newLi = document.createElement("li");
        newLi.textContent = tag.name; 
        containerSuggestions.appendChild(newLi);
      });

      // <img src="./images/close.svg">
      divContainerSearch.classList.add("searchActive");
      // divContainerSearch.appendChild(containerSuggestions);
    }
    if (ev.keyCode === 13 || ev.keyCode == "Enter") {      //si presiona ENTER va a traer los gifs y los va a pintar
        const gifs = await getSearchGifsByKeyword(ev.target.value, 0); //0 significa la primer pagina (0*12,1*12,2*12...)
        containerSuggestions.innerHTML = ""; 
        showTitle.textContent = ev.target.value;   
        
        gifs.data.forEach(gif => {
            const newImg = document.createElement('img');
            newImg.setAttribute("src", gif.images.fixed_height.url) 
            containerGifs.appendChild(newImg);
        });

        document.querySelector(".btnSearchGif").classList.toggle("toggleShowBtnVerMas");
        
        // TODO: HACER VISIBLE EL BUTTON VER MAS
        // `const toggleBtnVerMas = (ev) => {           //async?
        //     document.querySelector(".btnSearchGif").classList.toggle("toggleShowBtnVerMas");
        // };
        // document.querySelector("#searchGifos").addEventListener("keyup", toggleBtnVerMas);`  //que sea enter?
    }

    //BUSQUEDA SIN RESULTADO, QUE APAREZCA LA IMAGEN:   NO FUNCIONA!!!!!!!!!!!!!!!!!!!!!!
    if(ev.target.value === null){
        
        const messageSearch = document.createElement("h3");
        // messageSearch.innerHTML = '';
        messageSearch.textContent = "Intenta con otra búsqueda.";
        messageSearch.classList.add("noResultSearchGifos")  

        //.containerImgNoResult{         //IMG NO RESULT OUCH
        
    }
}