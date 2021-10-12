const pintarGifFav = () => {
    const localFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (localFavorites.favorites.length >= 1) {                             // if (containerFav != null) {
        document.querySelector(".noContentFavorites").style.display = "none";
        // while (containerFav.firstChild) {                               //hacer chequeo de repetidos
        //     containerFav.removeChild(containerFav.firstChild)
        // }
        const containerFav = document.querySelector(".imagesFavorites");
        containerFav.innerHTML = '';                                      //Para que no se repitan los favoritos
        
        localFavorites.favorites.forEach((fav) => {

            const divFav = document.createElement("div");
            divFav.classList.add("singleImgFav");
            divFav.innerHTML = `
            <img class="imgGifFav" src="${fav.url}" alt="imgGifos">
            <div class="favInfo"> 
                <div class="hoverIcons">
                    <a href="#" class="btnRemove"> <img data-id="${fav.id}"  src="./images/icon-fav.svg" alt="heart"></a>
                    <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                    <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
                </div>
                <div class="pInfo">
                    <p class="user">${fav.user}</p>
                    <p class="title">${fav.title}</p> 
                </div>
            </div>`;
            containerFav.appendChild(divFav);

            // buttonHeart.src = "./images/icon-fav-active.svg";   
            divFav.querySelector(".btnRemove").addEventListener("click", removeFavHandler);   //Eliminar favorite
                    
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
            
            divFav.querySelector(".btnExpand").addEventListener("click", function() {   //Modal Expand
                showModalExpand(fav.url, fav.id, fav.user, fav.title);
            });

            const downloadFav = async (ev) => {                     //Download
                let downloadUrl = await fetch(`https://media2.giphy.com/media/${fav.id}/giphy.gif`);
                let file = await downloadUrl.blob();
                const anchor = document.createElement("a");
                const urlGifs = URL.createObjectURL(file);
                anchor.href = urlGifs;
                const titleGif = document.querySelector(".imgGifFav").alt;
                anchor.download = `${titleGif}.gif`;
                document.body.appendChild(anchor);
                anchor.click(); 
                document.body.removeChild(anchor);
            };
            divFav.querySelector(".downloadIcon").addEventListener("click", downloadFav);
        });
        
    }else{
        document.querySelector(".noContentFavorites").style.display = "block";
    }
};

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

//Antes de agregar un GIF a favoritos, recuperes del LocalStorage los favoritos que tienes en ese momento,le hagas un parse, y busques (por id, por ejemplo), usando el método FIND o FILTER, si ya existe ese GIF.Si NO existe lo pusheas y vuelves a guardar el array en el LocalStorage. En en el caso de existir simplemente haces un return.
const agregarFavoritoHandler = (ev) => {
    const buttonPressed = ev.target;
    buttonPressed.src = "./images/icon-fav-active.svg";
    buttonPressed.style.backgroundColor = "#FFFFFF";
    buttonPressed.style.opacity = 0.8;
    buttonPressed.style.borderRadius = "6px";   
    buttonPressed.style.height = "1.6em";
    buttonPressed.style.width = "1.6em";
    buttonPressed.style.padding = ".2em";
    buttonPressed.style.marginTop = ".15em";
    buttonPressed.style.marginRight = ".3em";
    const idGifSelected = buttonPressed.getAttribute("data-id");                // Ver si está repetido o no
    const idGifSelectedUrl = buttonPressed.getAttribute("data-url");
    const idGifSelectedUser = buttonPressed.getAttribute("data-user");
    const idGifSelectedTitle = buttonPressed.getAttribute("data-title");
    const localFavorites = JSON.parse(localStorage.getItem("favorites"));

    if (localFavorites.favorites.length > 0) {
        let duplicado = false;                              // si hay favoritos, que no agregue si ya existe
        localFavorites.favorites.find((favorite) => {
            if (favorite.id === idGifSelected) {
                duplicado = true;
            }
        });
        if (duplicado) {
            console.log("El gif ya se encuentra en favoritos, no lo agregamos");
            return;
        }
    }   
    localFavorites.favorites.push({        // Agrego el favorito porque el array es vacío o el id no está presente
        type: "gif",
        id: idGifSelected,
        url: idGifSelectedUrl,
        user: idGifSelectedUser,
        title: idGifSelectedTitle,
    });
    localStorage.setItem("favorites", JSON.stringify(localFavorites)); // Guardo en local storage
    pintarGifFav(); 
};

const removeFavHandler = (ev) => {
    const buttonRemove = ev.target;
    const idGifRemove = buttonRemove.getAttribute("data-id");
    const localFavorites = JSON.parse(localStorage.getItem("favorites"));
    for (i = 0; i < localFavorites.favorites.length; i++) {
        if (localFavorites.favorites[i].id == idGifRemove) {
            localFavorites.favorites.splice(i, 1);
        }
    };
    localStorage.setItem("favorites", JSON.stringify(localFavorites));
    pintarGifFav();

    if(localFavorites.favorites.length < 1){
        //document.querySelector(".noContentFavorites").style.display = "inline-block";
        location.reload();
    }
};