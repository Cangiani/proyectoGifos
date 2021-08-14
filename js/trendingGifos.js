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

        //MODAL EXPAND
        const expandGif = imagesLatestGifos.querySelector('.btnExpand');
        expandGif.addEventListener("click", function() {
            showModalExpand(imgGifo.images.fixed_height.url, imgGifo.id, imgGifo.username, imgGifo.title);
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


    // modal.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);       
};



// LOCALSTORAGE

// const clickFavoriteGif = (ev) => {
//     const buttonPressed = ev.target;
//     const idGifClickeado =  parseInt(buttonPressed.getAttribute("data-id"));
//     const localGifs = JSON.parse(localStorage.getItem('favorites'));
// }




// const favoritesGifos = () => {
//     if (localStorage.getItem("favorites")){      //consulta si existe "favoritos"
//         //si existe:
//     }else {                                     //si no existe (setea con setItem)
//         localStorage.setItem("favorites", JSON.stringify({favorites: []}))    //desp pusheamos este array
//     }
// }


// EJERCICIO POKEMONS

// const getAllPokemons = async (api_url) => {
//     try {
//         const pokemons = await fetch(api_url);
//         return pokemons.json()
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// //get single pokemon

// const getSinglePokemon = async() => {
//     const singlePokemon = await getAllPokemons(url)
//     return singlePokemon.json()
// }

// let offsetPokemon = 0;

// pagination
// const verMas = (ev) => {
//     offsetPokemon += 3;
//     getPokemonesGeneral();
// }

// const pintarPokemon =  (pokemon, container) => {
//     const divBase = document.createElement('div');
//     divBase.classList.add('pokemon');
//     divBase.innerHTML = `
//     <h2 class="namePokemon">${pokemon.name.toUpperCase()} (${pokemon.id})</h2>
//     <div class="image">
//     <img class="imagePokemon" src="${pokemon.picture}" alt="${pokemon.name}">
//      </div>
//      <div class="infoPokemon">
//     <ul>
//         <li>Peso: ${pokemon.weight}</li>
//         <li>Altura: ${pokemon.height}</li>
//         <li><button data-id="${pokemon.id}" class="setFavorito"> Lo amo </button></li>
//     </ul>
//      </div>`
//     container.appendChild(divBase);
//     divBase.querySelector("button").addEventListener("click",agregarFavoritoHandler);
    
// }

// const pintarFavoritos = () => {
//     const localFavoritos= JSON.parse (localStorage.getItem('favoritos'));
//     const containerFavoritos =  document.querySelector('.general > .container.favoritos');
//     containerFavoritos.innerHTML = '';
//     localFavoritos.favoritos.forEach(favorito => {
//         pintarPokemon (favorito,containerFavoritos);
//     })
// }

// const agregarFavoritoHandler = (ev) => {

//     const buttonPressed = ev.target;
//     const idPokemonSelected =  parseInt(buttonPressed.getAttribute("data-id"));
//     const localPokemones = JSON.parse (localStorage.getItem('pokemones'));
//     const localFavoritos= JSON.parse (localStorage.getItem('favoritos'));

//     if (buttonPressed.textContent === "odiar"){
//         // eliminar de favoritos
//     }else {
        
        
//         const pokemonJson =localPokemones.pokemones.find(p => p.id === idPokemonSelected);
//         localFavoritos.favoritos.push(pokemonJson);
//         localStorage.setItem('favoritos',JSON.stringify(localFavoritos));
//         buttonPressed.textContent = "odiar";
       
//     }
//     pintarFavoritos ();
// }


// const getPokemonesGeneral = async (ev) => {
//     const API_URL = `https://pokeapi.co/api/v2/pokemon/?limit=3&offset=${offsetPokemon}`
//     const pokemons = await getAllPokemons(API_URL);

//     const localPokemones = JSON.parse (localStorage.getItem('pokemones'))
    
//     //create array with each pokemon
//     const pokemonUrls = await pokemons.results.map (async pokemon => {
        
//         const pokemonData = await getAllPokemons(pokemon.url)
        
//         const transformedPokemon =  {
//             id: pokemonData.id,
//             name: pokemonData.name,
//             picture: pokemonData.sprites.other.dream_world.front_default,
//             weight: pokemonData.weight,
//             height: pokemonData.height
//         }

//         localPokemones.pokemones.push(transformedPokemon);

//         return transformedPokemon
//     })


//     const pokemonDataJson = await Promise.all(pokemonUrls)
//     localStorage.setItem('pokemones',JSON.stringify(localPokemones));

//     //create divs
//     const container = document.querySelector('.general > .container');
//     pokemonDataJson.forEach(poke => {
//        pintarPokemon (poke,container);
//     })
    
// }

// //create "ver mas"
// const createButton = () => {
//     const general = document.querySelector('.general')
//     const verMasBtn = document.createElement('span');
//     verMasBtn.classList.add('verMas')
//     verMasBtn.innerHTML = `<img src="./pokeball.png" alt="pokeball">`;
//     general.appendChild(verMasBtn)

//     verMasBtn.addEventListener('click', verMas)
// }

// const inicializarFavoritos = () => {

//     if(localStorage.getItem('favoritos')) {
//         pintarFavoritos();
//     }else {
//         localStorage.setItem('favoritos',JSON.stringify({favoritos: []}));
//     }
//     localStorage.setItem('pokemones',JSON.stringify({pokemones: []}));
// }



// document.addEventListener('DOMContentLoaded', function(){
//     document.querySelector('.get-pokemon').classList.add('hidden');
//     inicializarFavoritos();
//     getPokemonesGeneral();
//     createButton();

// })


            // const agregarFavoritoHandler = (ev) => {

            //     const buttonPressed = ev.target;
            //     const idPokemonSelected =  parseInt(buttonPressed.getAttribute("data-id"));
            //     const localPokemones = JSON.parse (localStorage.getItem('pokemones'));
            //     const localFavoritos= JSON.parse (localStorage.getItem('favoritos'));

            //     if (buttonPressed.textContent === "odiar"){
            //         // eliminar de favoritos
            //     }else {
                    
            //         const pokemonJson =localPokemones.pokemones.find(p => p.id === idPokemonSelected);
            //         localFavoritos.favoritos.push(pokemonJson);
            //         localStorage.setItem('favoritos',JSON.stringify(localFavoritos));
            //         buttonPressed.textContent = "odiar";
            //     }
            //     pintarFavoritos ();
            // }


            // const getPokemonesGeneral = async (ev) => {
            //     const API_URL = `https://pokeapi.co/api/v2/pokemon/?limit=3&offset=${offsetPokemon}`
            //     const pokemons = await getAllPokemons(API_URL);

            //     const localPokemones = JSON.parse (localStorage.getItem('pokemones'))
                
            //     //create array with each pokemon
            //     const pokemonUrls = await pokemons.results.map (async pokemon => {
                    
            //         const pokemonData = await getAllPokemons(pokemon.url)
                    
            //         const transformedPokemon =  {
            //             id: pokemonData.id,
            //             name: pokemonData.name,
            //             picture: pokemonData.sprites.other.dream_world.front_default,
            //             weight: pokemonData.weight,
            //             height: pokemonData.height
            //         }

            //         localPokemones.pokemones.push(transformedPokemon);

            //         return transformedPokemon
            //     })


            //     const pokemonDataJson = await Promise.all(pokemonUrls)
            //     localStorage.setItem('pokemones',JSON.stringify(localPokemones));

            //     //create divs
            //     const container = document.querySelector('.general > .container');
            //     pokemonDataJson.forEach(poke => {
            //        pintarPokemon (poke,container);
            //     })
                
            // }
