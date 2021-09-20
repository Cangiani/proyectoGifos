const containerFav = document.querySelector(".imagesFavorites"); 

const pintarGifFav = () =>{      

    const localFavorites = JSON.parse(localStorage.getItem('favorites'));
    //document.getElementById("noContentFavorites").style.display = "none";

    if (containerFav != null) {         //if (localFavorites.favorites.length >0) {           //MEJOR >=1?

        // containerFav.innerHTML = '';

        localFavorites.favorites.forEach(fav => {               //mejor poner map?   
            
            const divFav = document.createElement("div");
            divFav.classList.add("singleImgFav");
            divFav.innerHTML = `
            <img class="imgGifFav" src="${fav.images.fixed_height.url}" alt="imgGifos">
            <div class="favInfo"> 
            <div class="hoverIcons">
                <a href="#"> <img data-id="${fav.id}" class="btnHeartRemove" src="./images/icon-fav.svg" alt="heart"></a>
                <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="pInfo">
                <p class="user">${fav.username}</p>
                <p class="title">${fav.title}</p> 
            </div>
            </div>`;
            containerFav.appendChild(divFav); 

            //ELIMINAR FAVORITE
            //containerFav.querySelector('.btnRemoveFav').addEventListener("click", removeFavHandler);
            // if (buttonPressed.image.src === "./images/icon-fav-active.svg"){
            //     //localStorage.removeItem('favorites');                                               
            // }

            //MODAL EXPAND
            const expandGif = containerFav.querySelector('.btnExpand');
            expandGif.addEventListener("click", function() {
            showModalExpand(fav.images.fixed_height.url, fav.id, fav.username, fav.title);
            });

            //DOWNLOAD
        });
    }
}

const agregarFavoritoHandler = (ev => {
 
    if (arrayFavorites.length > 0){
        const buttonPressed = ev.target;
        // buttonPressed.image.src = "./images/icon-fav-active.svg"
        const idGifSelected = buttonPressed.getAttribute('data-id');    //const idGifSelected = parseInt(buttonPressed.getAttribute("data-id"));
        // const localGifs = JSON.parse(localStorage.getItem('gifs'));      //ya no hay localstorage gifs
        const gifsJson = arrayFavorites.find(fav => fav.id === idGifSelected);
        const localFavorites = JSON.parse(localStorage.getItem('favorites'));
        
        localFavorites.favorites.push(gifsJson);  

        localStorage.setItem('favorites', JSON.stringify(localFavorites));
        pintarGifFav();
    }
    
    // if (arrayFavorites.length > 0){
    //     // eliminar de favoritos
        
    //     }else {
    //         const idGifSelected = buttonPressed.getAttribute('data-id');    //const idGifSelected = parseInt(buttonPressed.getAttribute("data-id"));
        //     const localGifs = JSON.parse(localStorage.getItem('gifs'));    
        //     const localFavorites = JSON.parse(localStorage.getItem('favorites'));
        //     const gifsJson = localGifs.gifs.find(g => g.id === idGifSelected);
        //     localFavorites.favorites.push(gifsJson);                 
        //     localStorage.setItem('favorites', JSON.stringify(localFavorites));
    //     
    //     }
    //     pintarGifFav ();
    // }
});