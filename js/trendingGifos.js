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

        const containerTrending = document.getElementById("trendingGifos");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleGifo");
        imagesLatestGifos.innerHTML = `
        <img class="singleImg" src="${imgGifo.images.fixed_height.url}" alt="${imgGifo.title}">
        <div class="trendingInfo"> 
            <div class="hoverIcons">
                <a href="#" class="btnHeart"> <img data-id="${imgGifo.id}" src="./images/icon-fav.svg" alt="heart"></a>
                <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="pInfo">
                <p class="user">${imgGifo.username}</p>
                <p class="title">${imgGifo.title}</p> 
            </div>
        </div>`
        containerTrending.appendChild(imagesLatestGifos);

        //MOBILE
        // if (window.matchMedia("(max-width: 768px)").matches){

        //     const clickGif = imagesLatestGifos.querySelector('.singleImg');
        //     clickGif.addEventListener("click", function() {
        //         showModalExpand;
        //     });
        // } else{
        const expandGif = imagesLatestGifos.querySelector('.btnExpand');        //MODAL EXPAND
        expandGif.addEventListener("click", function() {
            showModalExpand(imgGifo.images.fixed_height.url, imgGifo.id, imgGifo.username, imgGifo.title);
        });
        // }
  
        // FAVORITES
        arrayFavorites.push(imgGifo);
        imagesLatestGifos.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler);
         
        //  DOWNLOAD 
        const downloadGif = async (ev) => {
                  
            let downloadUrl = await fetch(`https://media2.giphy.com/media/${imgGifo.id}/giphy.gif`);
            let file = await downloadUrl.blob();
            // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes   
            const anchor = document.createElement('a');  
            const urlGifs = URL.createObjectURL(file);
            anchor.href = urlGifs;
            const titleGif = document.querySelector('.singleImg').alt;
            anchor.download = `${titleGif}.gif`;
            //anchor.style = 'display: "none"';
            document.body.appendChild(anchor);
            anchor.click();                             // click on element to start download  
            document.body.removeChild(anchor);
            //     store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
            //anchor.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');

            // const downloadUrl = ('https://media2.giphy.com/media/${imgGifo.id}/giphy.gif');   //poner await fetch?
            // const fetchFile = fetch(downloadUrl);//.blob();            //use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
            // const blobFile = (await fetchFile).blob();
            // const urlGifs = URL.createObjectURL(await blobFile);
            // const anchor = document.createElement('a');  
            // anchor.href = urlGifs;
            // const titleGif = document.querySelector('.singleImg').alt;
            // anchor.download = `${titleGif}.gif`;
            // //anchor.style = 'display: "none"';
            // document.body.appendChild(anchor);
            // anchor.click();                             // click on element to start download  
            // document.body.removeChild(anchor);
            // //     store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
            // //anchor.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        };
        imagesLatestGifos.querySelector('.downloadIcon').addEventListener("click", downloadGif);
    })
};

// const agregarFavoritoHandler = (ev => {
//     const buttonPressed = ev.target;
//     buttonPressed.src = "./images/icon-fav-active.svg";
    
//     const idGifSelected = buttonPressed.getAttribute('data-id');    //const idGifSelected = parseInt(buttonPressed.getAttribute("data-id"));
//     const gifsJson = arrayFavorites.find(fav => fav.id === idGifSelected);
//     const localFavorites = JSON.parse(localStorage.getItem('favorites'));       //ya esta puesto en const global
//     localFavorites.favorites.push(gifsJson); 
//     localStorage.setItem('favorites', JSON.stringify(localFavorites));
//     pintarGifFav();
// });