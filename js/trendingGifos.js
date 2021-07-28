//TRENDING GIFOS:
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

    trending.data.map(imgGifo => {
        const containerTrending = document.querySelector("#trendingGifos");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleGifo");
        imagesLatestGifos.innerHTML = `
        <img class="singleImg" src="${imgGifo.images.fixed_height.url}" alt="imgGifos">
        <div class="trendingInfo"> 
            <div class="hoverIcons">
                <a href="#"> <img data-id="${imgGifo.id}" class="heart" src="./images/icon-fav.svg" alt="heart"></a>
                <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="pInfo">
                <p class="user">${imgGifo.username}</p>
                <p class="title">${imgGifo.title}</p> 
            </div>
        </div>`
        containerTrending.appendChild(imagesLatestGifos);
    })


    trending.data.forEach(trendingGif => {

        //MODAL
        const showModal = (ev) => {
            // document.querySelector("#trendingGifos .trendingInfo .btnExpand") = ev.target.src;

            const modal = document.createElement("div");
            modal.classList.add("modalShow");
            modal.style.display = "block";

            modal.innerHTML = `
            <div class= "gifExpand">
                <img class="modalImg" src="${trendingGif.images.original.url}" alt="imgGifos"> 
                <a class= "btnCloseModal"> <img src="./images/close.svg"> </a>
            </div>
            <div class="trendingInfo"> 
                <div class="hoverIcons">
                    <a href=""> <img data-id="${trendingGif.id}" class="heart" src="./images/icon-fav.svg" alt="heart"></a>
                    <a href=""> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                    <a href=""> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
                </div>
                <div class="pInfo">
                    <p class="user">${trendingGif.username}</p>
                    <p class="title">${trendingGif.title}</p> 
                    a class= "heart"> <img src="./images/icon-fav.svg" alt="heart"> </a>
                    <a class= "downloadIcon"> <img src="./images/icon-download.svg" alt="download"> </a>
                </div>
            </div>`;

            //CERRAR MODAL
            modal.querySelector(".btnCloseModal").addEventListener("click", () => {
                modal.style.display = "none";
            });
            // const closeModal = (ev) => {
            //    const xClickeada = ev.target;
            //    modal.style.display = "none";
            //    xClickeada.closest('#modal').classList.remove('modalShow');
            // } 
        }

        document.querySelector(".btnExpand").addEventListener("click", showModal);

        //ROCIO
        // modal.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);       
    });
};