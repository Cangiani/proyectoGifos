const containerFav = document.querySelector(".imagesFavorites"); 

const showModalExpandFav = (ev) => {
    const modalExpand = document.createElement("div");
    modalExpand.classList.add("modalShow");
    modalExpand.style.display = "block";
    modalExpand.innerHTML = `
    <a class= "btnCloseModal"> <img src="./images/close.svg"> </a>
    <div class= "containerImgExpand">
        <img class="modalImg" src="${ev.target.image}" alt="imgGifos"> 
    </div>
    <div class="modalFavExpand"> 
        <div class="hoverIcons">
            <a href="#" class="btnHeartRemove"> <img data-id="${ev.target.id}" src="./images/icon-fav.svg" alt="heart"></a>
            <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
        </div>
        <div class="infoExpand">
            <p class="userExpand">${ev.target.username}</p>
            <p class="titleExpand">${ev.target.title}</p> 
        </div>
    </div>`;
};

const pintarGifFav = () =>{     
    const localFavorites = JSON.parse(localStorage.getItem('favorites'));
    // if (localFavorites.favorites.length >0) {   

    const containerFav = document.querySelector(".imagesFavorites"); 
    if (containerFav != null){
        document.querySelector(".noContentFavorites").style.display = "none";
        //containerFav.innerHTML = '';
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

            // const btnActive = document.querySelector('.btnHeartRemove');
            // // btnActive.src = "./images/icon-fav-active.svg";
            // btnActive.style.backgroundColor = "#FFFFFF";
            // btnActive.style.opacity = 0.9;
            // btnActive.style.borderRadius = "5px";

            //ELIMINAR FAVORITE
            document.querySelector('.btnHeartRemove').addEventListener("click", removeFavHandler);
            
            //Modal Expand Mobile
            // if (window.matchMedia("(max-width: 768px)").matches){
                // const expandImg = containerFav.querySelector('.imgGifFav');
                // expandImg.addEventListener("click", function() {
                //     showModalExpand(fav.images.fixed_height.url, fav.id, fav.username, fav.title);
                // });

            //     const clickGif = imagesLatestGifos.querySelector('.singleImg');
            //     clickGif.addEventListener("click", function() {
            //         showModalExpand;
            //     });
            // } else{
            // const expandGif = containerFav.querySelector('.btnExpand');       //Modal Expand Desktop
            // expandGif.addEventListener("click", function() {
            //     showModalExpand(fav.images.fixed_height.url, fav.id, fav.username, fav.title);
            // });
            // }
            
            const expandGif = containerFav.querySelector('.btnExpand'); 
            expandGif.addEventListener("click", showModalExpandFav);
            expandGif.image = fav.images.fixed_height.url;
            expandGif.id = fav.id;
            expandGif.username = fav.username;
            expandGif.title = fav.title;
            
            //DOWNLOAD
            const downloadFav = async (ev) => {
                let downloadUrl = await fetch(`https://media2.giphy.com/media/${fav.id}/giphy.gif`);
                let file = await downloadUrl.blob();  
                const anchor = document.createElement('a');  
                const urlGifs = URL.createObjectURL(file);
                anchor.href = urlGifs;
                const titleGif = document.querySelector('.imgGifFav').alt;
                anchor.download = `${titleGif}.gif`;
                document.body.appendChild(anchor);
                anchor.click();                             // click on element to start download  
                document.body.removeChild(anchor);
            };
            containerFav.querySelector('.downloadIcon').addEventListener("click", downloadFav);
        });
    }
}

const agregarFavoritoHandler = (ev => {   
    const buttonPressed = ev.target;
    buttonPressed.src = "./images/icon-fav-active.svg";
    buttonPressed.style.backgroundColor = "#FFFFFF";
    buttonPressed.style.opacity = 0.9;
    buttonPressed.style.borderRadius = "5px";
    //buttonPressed.classList.add("btnHeartPressed");
    
    const idGifSelected = buttonPressed.getAttribute('data-id');    
    //const idGifSelected = parseInt(buttonPressed.getAttribute("data-id"));
    const localFavorites = JSON.parse(localStorage.getItem('favorites')); 
    const gifsJson = arrayFavorites.find(fav => fav.id === idGifSelected);

    if (localFavorites.favorites.length > 0) {                // si hay favoritos, que no agregue si ya existe
        const esRepetido = false;
        localFavorites.favorites.forEach(favorite => {
            if (favorite.id == idGifSelected) {
                console.log("El gif ya se encuentra en favoritos, no lo agregamos");
                // return;
                esRepetido = true;
                // break;
            }
        })
        if (esRepetido) {
            return;
        }
    } 
    localFavorites.favorites.push(gifsJson); 
    localStorage.setItem('favorites', JSON.stringify(localFavorites));
    pintarGifFav();
    // localFavorites.favorites.push({                   // No hay favoritos o Hay favorito y no es repetido --> Agregarlo
    //     "type": "gif",
    //     "id": idGifSelected
    // })
    // console.log("El gif fue agregado en favoritos");
    

    // if (arrayFavorites.length > 0) {
    //     const buttonPressed = ev.target;
    //     const idGifSelected = buttonPressed.getAttribute('data-id');    //const idGifSelected = parseInt(buttonPressed.getAttribute("data-id"));
    //     const gifsJson = arrayFavorites.find(fav => fav.id === idGifSelected);
    //     const localFavorites = JSON.parse(localStorage.getItem('favorites'));       //ya esta puesto en const global   
        
    //    if(localFavorites.favorites.id !== idGifSelected){
    //         localFavorites.favorites.push(gifsJson); 
    //         localStorage.setItem('favorites', JSON.stringify(localFavorites));
    //         pintarGifFav();
    //         ev.stopPropagation();
    //     }else{
    //         console.log("El gif ya está en favoritos");
    //     }
    // }
});

const removeFavHandler = (ev => {

    const buttonRemove = ev.target;
    const idGifRemove = buttonRemove.getAttribute('data-id');
    const localFavorites = JSON.parse(localStorage.getItem("favorites"));             //ya esta puesto en const global
    // const gifRemoveJson = arrayFavRemove.filter(fav => fav.id !== idGifRemove);

    for (i = 0; i < localFavorites.favorites.length; i++) {
        if (localFavorites.favorites[i].id == idGifRemove) {
            localFavorites.favorites.splice(i, 1);
        }
    };
    // const indexArray = localFavorites.findIndex(fav => fav.id == idGifRemove);
    // localFavorites.splice(indexArray, 1);
    localStorage.setItem('favorites', JSON.stringify(localFavorites));
    pintarGifFav();

    //const gifRemoveJson = arrayFavorites.find(fav => fav.id === idGifRemove);
    //localStorage.removeItem('gifRemoveJson');

    // if (idGifRemove === localRemove.favorites.id){
    //    localStorage.favorites.removeItem(gifRemoveJson);  
    // }
    // localStorage.setItem('favorites', JSON.stringify(localRemove));

    //     let newData = products.filter(item => item.id !== id)
    //     localStorage.setItem('data', JSON.stringify(newData));
    //     setProducts(newData)

    // if (buttonRemove.image.src === "./images/icon-fav-active.svg"){
    //     localStorage.removeItem('favorites');                                               
    // }
});