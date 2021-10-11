document.addEventListener('DOMContentLoaded', ()=> {
    const misGifos = JSON.parse (localStorage.getItem('misGifos'));
    const containerMisGifos = document.querySelector(".imagesMisGifos"); 
    if (containerMisGifos != null) {         //if (localFavorites.favorites.length >0) {           //MEJOR >=1?
        
        document.querySelector(".noContentMisGifos").style.display = "none";

        const urls = misGifos.map (id => `https://i.giphy.com/${id}.gif`);
        const gifElements = urls.map (url =>  {
            const divMisGifos = document.createElement("div");
            divMisGifos.classList.add("singleImgMisGifos");                       
            divMisGifos.innerHTML = `
            <img class="imgMisGifos" src="${url}" alt="misGifos"> 
            <div class="gifoInfo"> 
                <div class= "hoverIcons">
                    <a href=""> <img data-id="${url.id}" class="iconTrash" src="./images/icon-trash-normal.svg" alt="trash"></a>
                    <a href=""> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                    <a href=""> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
                </div>
                <div class="pInfo">
                    <p class="user"></p>
                    <p class="titleMisGifos"></p> 
                </div>
            </div>`;

            //DELETE
            divMisGifos.querySelector('.iconTrash').addEventListener("click", removeMiGifo);

            //MODAL EXPAND
            const expandGif = divMisGifos.querySelector('.btnExpand');
            expandGif.addEventListener("click", function() {
                expandMisGifos(url.images.fixed_height.url, url.id);
                console.log(url.images.fixed_height.url);
                console.log(url.id);
            });
    
            //DOWNLOAD
            const downloadMyGifo = async (ev) => {    
                let downloadUrl = await fetch(`https://media2.giphy.com/media/${url.id}/giphy.gif`);
                let file = await downloadUrl.blob();  
                const anchor = document.createElement('a');  
                const urlGifs = URL.createObjectURL(file);
                anchor.href = urlGifs;
                const titleGif = document.querySelector('.imgMisGifos').alt;
                anchor.download = `${titleGif}.gif`;
                anchor.style = 'display: "none"';
                document.body.appendChild(anchor);
                anchor.click();                              
                document.body.removeChild(anchor);
            };
            divMisGifos.querySelector('.downloadIcon').addEventListener("click", downloadMyGifo);
            return divMisGifos;
        });
        gifElements.forEach(gif => {
            document.querySelector('.imagesMisGifos').appendChild(gif);
        });
    }
});

const expandMisGifos = (img, id) => {
    //const containerModal = document.getElementById("containerTrending");
    const modalExp = document.createElement("div");
    modalExp.classList.add("modalShow");
    modalExp.style.display = "block";
    modalExp.innerHTML = `
    <a class= "btnCloseModal"> <img src="./images/close.svg"> </a>
    <div class= "containerImgExpand">
        <img class="modalImg" src="${img}" alt="imgGifos"> 
    </div>
    <div class="trendingExpand"> 
        <div class="hoverIcons">
            <a href="#"> <img data-id="${id}" class="btnHeart" src="./images/icon-fav.svg" alt="heart"></a>
            <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
        </div>
    </div>`;
    //containerModal.appendChild(modalExp);

    if (document.querySelector('#containerTrending')) {
    document.querySelector('#containerTrending').appendChild(modalExp);
    }

    if (document.querySelector('#containerFavorites')) {
    document.querySelector('#containerFavorites').appendChild(modalExp);
    }

    if (document.querySelector('.containerMisGifos')) {
    document.querySelector('.containerMisGifos').appendChild(modalExp);
    }

    // FAVORITES
    const localGifs = JSON.parse(localStorage.getItem('gifs'));
    localGifs.gifs.push(imgGifo);
    localStorage.setItem('gifs', JSON.stringify(localGifs));
    modalExp.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler);

    //CERRAR MODAL
    modalExp.querySelector(".btnCloseModal").addEventListener("click", () => {
    modalExp.style.display = "none";
    });
}

const removeMiGifo = (ev => {
    const buttonRemove = ev.target;
    const idGifRemove = buttonRemove.getAttribute('data-id');
    const localMisGifos = JSON.parse(localStorage.getItem('misGifos'));
    for (i = 0; i < localMisGifos.length; i++) {
        if (localMisGifos[i].id == idGifRemove) {
            localMisGifos.splice(i, 1);
        }
    };
    localStorage.setItem('misGifos', JSON.stringify(localMisGifos));
    //FALTA CARGAR EL DOM DE NUEVO
});

//LOCAL STORAGE

// const pintarFavoritos = () => {
// const localFavorites = JSON.parse (localStorage.getItem('favorites'));
// const containerFavorites =  document.querySelector('#containerFavorites .imagesFavorites');
// containerFavorites.innerHTML = '';

// localFavorites.favorites.forEach(favorite => {
//     pintarGif (favorito, containerFavoritos);
// })
//}

//MODAL

//CERRAR MODAL    