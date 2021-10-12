document.addEventListener('DOMContentLoaded', () => {
    const misGifos = JSON.parse(localStorage.getItem('misGifos'));
    
    if (misGifos.length >= 1) {           
        document.querySelector(".noContentMisGifos").style.display = "none";
        
        const urls = misGifos.map (id => `https://i.giphy.com/${id}.gif`);
        const misGifosElements = urls.map (url => {
            const divMisGifos = document.createElement("div");
            divMisGifos.classList.add("singleImgMisGifos");                       
            divMisGifos.innerHTML = `
            <img class="imgMisGifos" src="${url}" alt="misGifos"> 
            <div class="gifoInfo"> 
                <div class= "hoverIcons">
                    <a href=""> <img class="iconTrash" data-id="${url.id}" src="./images/icon-trash-normal.svg" alt="trash"></a>
                    <a href=""> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                    <a href=""> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
                </div>
                <div class="pInfo">
                    <p class="user"></p>
                    <p class="titleMisGifos"></p> 
                </div>
            </div>`;
            document.querySelector('.imagesMisGifos').appendChild(divMisGifos);

            // const misGifos = JSON.parse(localStorage.getItem('misGifos'));
            // misGifos.push({        
            //     type: "gif",
            //     id: `${url.id}`,
            //     url: `${url}`,
            // });
            // localStorage.setItem("misGifos", JSON.stringify(misGifos));

            const removeMiGifo = (ev) => {
                const buttonRemove = ev.target;
                const idGifRemove = buttonRemove.getAttribute('data-id');
                const localMisGifos = JSON.parse(localStorage.getItem('misGifos'));
                for (i = 0; i < localMisGifos.length; i++) {
                    if (localMisGifos[i].id == idGifRemove) {
                        localMisGifos.splice(i, 1);
                    }
                };
                localStorage.setItem('misGifos', JSON.stringify(localMisGifos));
                location.reload();
                
                // if(localFavorites.favorites.length < 1){
                //     document.querySelector(".noContentFavorites").style.display = "inline-block";
                //     location.reload();
                // }
            };
            divMisGifos.querySelector('.iconTrash').addEventListener("click", removeMiGifo);   //Delete

            const downloadMyGifo = async (ev) => {                                            //Download
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

            const expandMisGifos = (img, id) => {                                           //Expand
                const containerModal = document.querySelector(".containerMisGifos");
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
                containerModal.appendChild(modalExp);
            
                modalExp.querySelector('.btnHeart').addEventListener("click", agregarFavoritoHandler);//Favorites
            
                const downloadMyGifo = async (ev) => {                                                    //Download
                    let downloadUrl = await fetch(`https://media2.giphy.com/media/${url.id}/giphy.gif`);
                    let file = await downloadUrl.blob();
                    const anchor = document.createElement("a");
                    const urlGifs = URL.createObjectURL(file);
                    anchor.href = urlGifs;
                    const titleGif = modalExp.querySelector(".modalImg").alt;
                    anchor.download = `${titleGif}.gif`;
                    document.body.appendChild(anchor);
                    anchor.click(); 
                    document.body.removeChild(anchor);
                };
                modalExp.querySelector(".downloadIcon").addEventListener("click", downloadMyGifo);
                
                modalExp.querySelector(".btnCloseModal").addEventListener("click", () => {     //CERRAR MODAL
                    modalExp.style.display = "none";
                });
            }
            divMisGifos.querySelector('.btnExpand').addEventListener("click", function() {   //MODAL EXPAND
                expandMisGifos(url, url.id);
            });
    
            return divMisGifos;
        });
        // gifElements.forEach(gif => {
        //     document.querySelector('.imagesMisGifos').appendChild(gif);
        // });

    }else{
        document.querySelector(".noContentMisGifos").style.display = "block";
    }
});