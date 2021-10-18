const getMisGifos = () => {
    const misGifos = JSON.parse(localStorage.getItem('misGifos'));

    if (misGifos.length >= 1) {           
        document.querySelector(".noContentMisGifos").style.display = "none";
        
        misGifos.forEach (id => {
            const divMisGifos = document.createElement("div");
            divMisGifos.classList.add("singleImgMisGifos");                       
            divMisGifos.innerHTML = `
            <img class="imgMisGifos" src="https://i.giphy.com/${id}.gif" alt="misGifos"> 
            <div class="gifoInfo"> 
                <div class= "hoverIcons">
                    <a> <img class="iconTrash" data-id="${id}" src="./images/icon-trash-normal.svg" alt="trash"></a>
                    <a> <img class="downloadIcon" data-id="${id}" src="./images/icon-download.svg" alt="download"></a>
                    <a> <img class="btnExpand" data-id="${id}" src="./images/icon-max-normal.svg" alt="max"></a>
                </div>
                <div class="pInfo">
                    <p class="user"></p>
                    <p class="titleMisGifos"></p> 
                </div>
            </div>`;

            document.querySelector('.imagesMisGifos').appendChild(divMisGifos);

            divMisGifos.querySelector('.iconTrash').addEventListener("click", removeMiGifo);   //Delete
            divMisGifos.querySelector('.downloadIcon').addEventListener("click", downloadMyGifo);    //Download
            divMisGifos.querySelector('.btnExpand').addEventListener("click", expandMisGifos);
        });

    }else{
        document.querySelector(".noContentMisGifos").style.display = "block";
    }
};

const removeMiGifo = (ev) => {
    const buttonRemove = ev.target;
    const idGifRemove = buttonRemove.getAttribute('data-id');
    const localMisGifos = JSON.parse(localStorage.getItem('misGifos'));
    for (i = 0; i < localMisGifos.length; i++) {
        if (localMisGifos[i] == idGifRemove) {
            localMisGifos.splice(i, 1);
        }
    };
    localStorage.setItem('misGifos', JSON.stringify(localMisGifos));
    location.reload();                                                          // Falta repitan el HTML para que refleje que se borro. Remove child?
};

const downloadMyGifo = async (ev) => {                                          //Download
    const buttonDownload = ev.target;   
    const idGifDownload = buttonDownload.getAttribute("data-id");  
    console.log("downloadMyGifo", `https://media2.giphy.com/media/${idGifDownload}/giphy.gif`);    
    
    fetch(`https://media2.giphy.com/media/${idGifDownload}/giphy.gif`)
        .then( request => {
            return request.blob();
        }).then(file => {
            const anchor = document.createElement('a');  
            const urlGifs = URL.createObjectURL(file);
            anchor.href = urlGifs;
            const titleGif = document.querySelector('.imgMisGifos').alt;
            anchor.download = `${titleGif}.gif`;
            anchor.style = 'display: "none"';
            document.body.appendChild(anchor);
            anchor.click();                              
            document.body.removeChild(anchor);
        }).catch(error => {
            console.error(error);
    });
};

const expandMisGifos = async (ev) => {    //Expand
    const buttonExpand = ev.target;   
    const idGif = buttonExpand.getAttribute("data-id");  

    const containerModal = document.querySelector(".containerMisGifos");
    const modalExp = document.createElement("div");
    modalExp.classList.add("modalShow");
    modalExp.style.display = "block";
    modalExp.innerHTML = `
    <a class= "btnCloseModal"> <img src="./images/close.svg"> </a>
    <div class= "containerImgExpand">
        <img class="modalImg" src="https://i.giphy.com/${idGif}.gif" alt="imgGifos"> 
    </div>
    <div class="trendingExpand"> 
        <div class="hoverIcons">
            <a href="#"> <img data-id="${idGif}" class="btnHeart" src="./images/icon-fav.svg" alt="heart"></a>
            <a href="#"> <img data-id="${idGif}" class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
        </div>
    </div>`;
    containerModal.appendChild(modalExp);

    const addMyGifoToFavorites = (ev) => {
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
        const idGifSelected = buttonPressed.getAttribute("data-id");                      const localFavorites = JSON.parse(localStorage.getItem("favorites"));
    
        if (localFavorites.favorites.length > 0) {
            let duplicado = false;                            
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
        localFavorites.favorites.push({    
            type: "gif",
            id: idGifSelected,
            url: `https://i.giphy.com/${idGifSelected}.gif`,
            title: "MyGifo",
        });
        localStorage.setItem("favorites", JSON.stringify(localFavorites)); 
        pintarGifFav(); 
    };

    modalExp.querySelector('.btnHeart').addEventListener("click", addMyGifoToFavorites);  //Favorites
    modalExp.querySelector(".downloadIcon").addEventListener("click", downloadMyGifo);      //Download
    modalExp.querySelector(".btnCloseModal").addEventListener("click", () => {              //Cerrar modal
        modalExp.style.display = "none";
        modalExp.classList.remove("modalShow");
        modalExpandido = false;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    getMisGifos();
});