const pintarGifFav = () =>{                 

    const localFavorites = JSON.parse(localStorage.getItem('favorites'));
    
    if (localFavorites.favorites.length >= 1) {

        // const noContentFav = document.querySelector("#noContentFavorites").style.display = "none";

        localFavorites.favorites.forEach(fav => {

            const containerFav = document.querySelector("#containerFavorites .imagesFavorites");   
            const containerGifFav = document.createElement("div");
            containerGifFav.classList.add("singleGifo");
            containerGifFav.innerHTML = `
            <img class="singleImg" src="${fav.images.fixed_height.url}" alt="imgGifos">
            <div class="trendingInfo"> 
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
            containerFav.appendChild(containerGifFav); 

            // Remove Favorites             //HACER!!!
            //containerFav.querySelector('.btnRemoveFav').addEventListener("click", removeFavHandler);


            //EXPAND

            //DOWNLOAD
        });
    }
}

// containerGifFav.querySelector(".btnHeart").addEventListener("click", agregarFavoritoHandler);

// const gifosFound =[];   //poner en main?

// const addToFavs = (ev) => {
//     const button = ev.target;
//     if (gifosFound.length > 0) {
//         const idGifSelected = button.getAttribute('data-id');
//         const localFavs = JSON.parse(localStorage.getItem('favoritos'));
//         const favSelected = gifosFound.find(fav => fav.id === idGifSelected);
//         localFavs.push(favSelected);
//         localStorage.setItem('favoritos', JSON.stringify(localFavs))
//         printFavs()
//     }
// }

const agregarFavoritoHandler = (ev =>{
 
    const buttonPressed = ev.target;
    // buttonPressed.image.src = "./images/icon-fav-active.svg"

    const idGifSelected = buttonPressed.getAttribute("data-id");        //const idGifSelected = parseInt(buttonPressed.getAttribute("data-id"));
    const localGifs = JSON.parse(localStorage.getItem('gifs'));
    const localFavs = JSON.parse(localStorage.getItem('favorites'));
    const gifsJson = localGifs.gifs.find(g => g.id === idGifSelected);
    localFavs.favorites.push(gifsJson);                 //
    localStorage.setItem('favorites', JSON.stringify(localFavs));
    pintarGifFav ();
    
    
    // const containerFavorites =  document.querySelector('#containerFavorites .imagesFavorites');
    // containerFavorites.innerHTML = '';  
    // localFavorites.favorites.forEach(favorite => {
    //     pintarGifFav ();
    // })

    //ELIMINAR
    // if (buttonPressed.image.src === "./images/icon-fav-active.svg"){
    //     //localStorage.removeItem('favorites');                                               
    // }
});