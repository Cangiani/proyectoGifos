document.addEventListener('DOMContentLoaded', ()=> {

    const misGifos = JSON.parse (localStorage.getItem('misGifos'));
    const urls = misGifos.map (id => `https://i.giphy.com/${id}.gif`);

    const gifElements = urls.map (url =>  {

        const divMisGifos = document.createElement("div");
        //divMisGifos.classList.add("");                        //CREAR CLASS
        divMisGifos.innerHTML = `
        <img class="imgMisGifos" src="${url}" alt="imgMisGifos"> 
        <div class="searchInfo"> 
            <div class= "hoverIcons">
                <a href=""> <img data-id="${url}" class="iconTrash" src="./images/icon-trash-normal.svg" alt="trash"></a>
                <a href=""> <img class="downloadIcon" src="./images/icon-download.svg" alt="download"></a>
                <a href=""> <img class="btnExpand" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="pInfo">
                <p class="user"> PONER USER</p>
                <p class="titleMisGifos"> PONER TITLE </p> 
            </div>
        </div>`

        //DELETE

        //MODAL EXPAND
        // const expandGif = divMisGifos.querySelector('.btnExpand');
        // expandGif.addEventListener("click", function() {
        //     showModalExpand(url.images.fixed_height.url, url.id, url.username, url.title);
        // });
  
        // DOWNLOAD 
        // const downloadGif = async (ev) => {
        //     let downloadUrl = await fetch(`https://media2.giphy.com/media/${url.id}/giphy.gif`);
        //     let file = await downloadUrl.blob();
        //     // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes   
        //     const anchor = document.createElement('a');  
        //     const urlGifs = URL.createObjectURL(file);
        //     anchor.href = urlGifs;
        //     const titleGif = document.querySelector('.singleImg').alt;
        //     anchor.download = "misGifos.gif";
        //     //anchor.style = 'display: "none"';
        //     document.body.appendChild(anchor);
        //     anchor.click();                             // click on element to start download  
        //     document.body.removeChild(anchor);
        // }
        // divMisGifos.querySelector('.downloadIcon').addEventListener("click", downloadGif);

        return divMisGifos;
    });

    gifElements.forEach(gif => {
        document.querySelector('.imagesMisGifos').appendChild(gif);
    });
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