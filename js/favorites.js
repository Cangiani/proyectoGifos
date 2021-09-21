const containerFav = document.querySelector(".imagesFavorites"); 

const pintarGifFav = () =>{      

    const localFavorites = JSON.parse(localStorage.getItem('favorites'));
    
    if (containerFav != null) {         //if (localFavorites.favorites.length >0) {           //MEJOR >=1?
        
        document.getElementById("noContentFavorites").style.display = "none";

        // containerFav.innerHTML = '';
        localFavorites.favorites.forEach(fav => {               //mejor poner map?   
            containerFav.classList.add("imagesFavorites");
            
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
            //containerFav.querySelector('.btnHeartRemove').addEventListener("click", removeFavHandler);
            
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
 
    const buttonPressed = ev.target;
    
    if (arrayFavorites.length > 0){
        
        const idGifSelected = buttonPressed.getAttribute('data-id');    //const idGifSelected = parseInt(buttonPressed.getAttribute("data-id"));
        const gifsJson = arrayFavorites.find(fav => fav.id === idGifSelected);
        const localFavorites = JSON.parse(localStorage.getItem('favorites'));
        localFavorites.favorites.push(gifsJson); 
        localStorage.setItem('favorites', JSON.stringify(localFavorites));
        pintarGifFav();
    }
});

// const removeFavHandler = (ev =>{
//     const buttonRemove = ev.target;
//     const idGifRemove = buttonRemove.getAttribute('data-id');
//     const localRemove = JSON.parse(localStorage.getItem('favorites'));

//     const gifRemoveJson = arrayFavorites.find(fav => fav.id === idGifRemove);
    
//     //localStorage.removeItem('gifRemoveJson');

//     if (idGifRemove === localRemove.favorites.id){
//        localStorage.removeItem('gifRemoveJson');  
//     }
     

//     // if (buttonRemove.image.src === "./images/icon-fav-active.svg"){
//     //             //localStorage.removeItem('favorites');                                               
//     //         }
// });