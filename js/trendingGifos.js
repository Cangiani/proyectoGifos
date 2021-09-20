//en cada pagina de html que se repita el trendingGifos tengo que copiar el script de trending, no el codigo.

const getTrendingGifos = async () => {
    try {
        const gifs = await fetch(`${API_URL}/trending?api_key=${API_KEY}&limit=3&rating=g`);
        return gifs.json()
    } catch (error) {
        console.log("Ocurrio un error",error)
    }
}

const trendingImages = async (trending) => {

    trending.data.forEach(imgGifo => {                      //conviene un forEach? VUELVO AL MAP?

        const containerTrending = document.querySelector("#trendingGifos");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleGifo");
        imagesLatestGifos.innerHTML = `
        <img class="singleImg" src="${imgGifo.images.fixed_height.url}" alt="imgGifos">
        <div class="trendingInfo"> 
            <div class="hoverIcons">
                <a href="#"> <img data-id="${imgGifo.id}" class="btnHeart" src="./images/icon-fav.svg" alt="heart"></a>
                <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="pInfo">
                <p class="user">${imgGifo.username}</p>
                <p class="title">${imgGifo.title}</p> 
            </div>
        </div>`
        containerTrending.appendChild(imagesLatestGifos);

        
        
        //MODAL EXPAND
        const expandGif = imagesLatestGifos.querySelector('.btnExpand');
        expandGif.addEventListener("click", function() {
            showModalExpand(imgGifo.images.fixed_height.url, imgGifo.id, imgGifo.username, imgGifo.title);
        });
  
        // //FAVORITES
        // const localGifs = JSON.parse(localStorage.getItem('gifs'));
        // localGifs.gifs.push(imgGifo);
        // localStorage.setItem('gifs', JSON.stringify(localGifs));

        // imagesLatestGifos.querySelector('.btnHeart').addEventListener("click", function() {
         
        //     const localGifs = JSON.parse(localStorage.getItem('gifs'));
        //     localGifs.gifs.push(imgGifo);
        //     localStorage.setItem('gifs', JSON.stringify(localGifs));
        //     agregarFavoritoHandler()

        // });
        
        // const getFavorites = () => {
        //     const localFavorites = JSON.parse(localStorage.getItem('favorites'));
        //     const containerFavorites =  document.querySelector('#containerFavorites .imagesFavorites');
        //     containerFav.innerHTML = '';  
        //     localFavorites.favorites.forEach(favorite => {
        //         pintarGifFav ();
        //     })
        // } 
        
    })
};