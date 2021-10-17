const trendingImages = async (trending) => {
    trending.data.forEach((imgGifo) => {
        const containerTrending = document.getElementById("trendingGifos");
        const imagesLatestGifos = document.createElement("div");
        imagesLatestGifos.classList.add("singleGifo");
        imagesLatestGifos.innerHTML = `
        <img class="singleImg" src="${imgGifo.images.fixed_height.url}" alt="${imgGifo.title}">
        <div class="trendingInfo"> 
            <div class="hoverIcons">
                <a href="#" class="btnHeart">
                    <img 
                        data-id="${imgGifo.id}" 
                        data-url="${imgGifo.images.fixed_height.url}" 
                        data-user="${imgGifo.username}" 
                        data-title="${imgGifo.title}"
                        src="./images/icon-fav.svg" 
                        alt="heart">
                </a>
                <a href="#"> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                <a href="#"> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="pInfo">
                <p class="user">${imgGifo.username}</p>
                <p class="title">${imgGifo.title}</p> 
            </div>
        </div>`;
        containerTrending.appendChild(imagesLatestGifos);
            
        //MODAL EXPAND
        
        if(window.matchMedia("(max-width: 768px)").matches){               //MOBILE
            //const clickGif = imagesLatestGifos.querySelector('.singleImg');
            imagesLatestGifos.querySelector('img').addEventListener("click", function() {
                showModalExpand(
                    imgGifo.images.fixed_height.url,
                    imgGifo.id,
                    imgGifo.username,
                    imgGifo.title
                );
            });
            // imagesLatestGifos.querySelector('img').addEventListener("touchstart", function() {
            //     showModalExpand(
            //         imgGifo.images.fixed_height.url,
            //         imgGifo.id,
            //         imgGifo.username,
            //         imgGifo.title
            //     );
            // }, {passive: true});
        }else{
            imagesLatestGifos.querySelector(".btnExpand").addEventListener("click", function () {
                showModalExpand(
                    imgGifo.images.fixed_height.url,
                    imgGifo.id,
                    imgGifo.username,
                    imgGifo.title
                );
            });
        }

        imagesLatestGifos.querySelector(".btnHeart").addEventListener("click", agregarFavoritoHandler);// FAVORITES

        const downloadGif = async (ev) => {                              //  DOWNLOAD
            let downloadUrl = await fetch(`https://media2.giphy.com/media/${imgGifo.id}/giphy.gif`);
            let file = await downloadUrl.blob();
            // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
            const anchor = document.createElement("a");
            const urlGifs = URL.createObjectURL(file);
            anchor.href = urlGifs;
            const titleGif = document.querySelector(".singleImg").alt;
            anchor.download = `${titleGif}.gif`;
            document.body.appendChild(anchor);
            anchor.click(); // click on element to start download
            document.body.removeChild(anchor);
        };
        imagesLatestGifos.querySelector(".downloadIcon").addEventListener("click", downloadGif);
    });
};