// const trendingImages = async (trending) => {

//     trending.data.map(imgGifo => {
    
//         const containerTrending = document.querySelector("#trendingGifos");
//         const imagesLatestGifos = document.createElement("div");
//         imagesLatestGifos.classList.add("singleGifo");
//         imagesLatestGifos.innerHTML = `
//         <img class="singleImg" src="${imgGifo.images.fixed_height.url}" alt="imgGifos">
//         <div class="trendingInfo"> 
//             <div class="hoverIcons">
//                 <a href="#"> <img data-id="${imgGifo.id}" class="heart" src="./images/icon-fav.svg" alt="heart"></a>
//                 <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
//                 <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
//             </div>
//             <div class="pInfo">
//                 <p class="user">${imgGifo.username}</p>
//                 <p class="title">${imgGifo.title}</p> 
//             </div>
//         </div>`
//         containerTrending.appendChild(imagesLatestGifos);

//         //MODAL EXPAND
//         const expandGif = imagesLatestGifos.querySelector('.btnExpand');
//         expandGif.addEventListener("click", function() {
//             showModalExpand(imgGifo.images.fixed_height.url, imgGifo.id, imgGifo.username, imgGifo.title);
//         });
        

//         // const showModalMobile = () =>{

//         // }

//         //DESKTOP
//         // if (window.matchMedia("(min-width: 768px)").matches) {

//         //     MODAL EXPAND
            
//         //     // const expandGif = imagesLatestGifos.querySelector('.btnExpand');
//         //     // expandGif.addEventListener("click", showModalExpand);
//         //     // expandGif.imageGif = imgGifo.images.fixed_height.url;
//         //     // expandGif.idGif = imgGifo.id;
//         //     // expandGif.username = imgGifo.username;
//         //     // expandGif.title = imgGifo.title;
//         // }

//     });

//     //LOCAL STORAGE

//     // const pintarFavoritos = () => {
//     // const localFavorites = JSON.parse (localStorage.getItem('favorites'));
//     // const containerFavorites =  document.querySelector('#containerFavorites .imagesFavorites');
//     // containerFavorites.innerHTML = '';

//     // localFavorites.favorites.forEach(favorite => {
//     //     pintarGif (favorito, containerFavoritos);
//     // })
//     //}


//     // modal.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);       
// };




