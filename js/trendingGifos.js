
// const getTrendingGifos =  async (apiUrl,apiKey,query) => {
//     try {
//         const gifs = await fetch(`${apiUrl}?api_key=${apiKey}&q=${query}`);
//         return gifs.json()
//     } catch (error) {
//         console.log("ocurrio un error",error)
//     }
// }


// const getSuggestionsGifos = async (ev) => {

//     const API_URL = "https://api.giphy.com/v1/gifs/trending";   //??????????'

//     const API_KEY =  "u97suGng8xUtL28uyoZRwdmODNFgxzIY";     

//     const contenedorTrendingGifos = document.querySelector("#trendingGifos");
//     // contenedorTrendingGifos.innerHTML = "<img src="${trendingUrl}">";           //HACER TRENDINGURL

//     if(ev.target.value.length >= 3) {
//         const gifs = await getSearchTags(API_URL,API_KEY,ev.target.value);
//         gifs.data.forEach(tag => {
//             const newDiv = document.createElement("div");
//             newDiv.textContent = tag.name;                  //?????????
//             contenedorTrendingGifos.appendChild(newLi);
//         });
//     }
// }