const containerCreateGifos = document.getElementById("containerCreateGifos");
const containerVideo = document.querySelector(".containerVideo");
const btnComenzar = document.querySelector(".comenzar");
const btnGrabar = document.querySelector(".grabar");
const btnFinalizar = document.querySelector(".finalizar");
const btnSubir = document.querySelector(".subir");
const btnRepeat = document.querySelector(".btnRepeat");

let recordStarted = false;
const uploadEndpoint = 'http://upload.giphy.com/v1/gifs?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY';

async function uploadGif(formData){
    const response = await fetch(uploadEndpoint,{
        method: "POST",
        body: formData
    });
    return response.json()
}

function previewGif ({id}) {
    containerVideo.innerHTML= `<img class='preview' data-id='${id}' src='https://i.giphy.com/${id}.gif' alt="misGifos">`;
}

const startVideo = () =>{                                     //función que inicie las funciones de captura.
    containerVideo.innerHTML = '<video>';
    btnComenzar.style.display = "none";
    containerCreateGifos.querySelector(".text1").style.display = "none";
    containerCreateGifos.querySelector(".text2").style.display = "block";
    containerCreateGifos.querySelector(".num1").style.backgroundColor = "#572EE5";
    containerCreateGifos.querySelector(".num1").style.color = "white";
    btnGrabar.style.display = "none";         
}

function getStreamAndRecord() {         //Devuelve una promesa,manejar la respuesta de manera asíncrona. 
    startVideo();
    const video = document.querySelector("video");
    navigator.mediaDevices.getUserMedia({                           //este es el prompt pidiendo permiso
        audio: false,                                               //constraints 
        video: {width: 400, height: 250}
    }).then(function(stream) {          //Una vez que tienes tu stream,      
        
        containerCreateGifos.querySelector(".text2").style.display = "none";
        alert('¿Nos das acceso a tu cámara? El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO');
        video.srcObject = stream;      //puedes utilizarlo como src de la tag <video/> y llamar play() para que comience a reproducirse.
        video.play();
        containerCreateGifos.querySelector(".containerPreview").style.display = "block";
        btnGrabar.style.display = "block";

        const recorder = RecordRTC(stream, {            //El archivo está en memoria, es el BLOB
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
        });                           

        btnGrabar.addEventListener('click', function(){
            btnGrabar.style.display = "none";
            btnFinalizar.style.display = "block";
            containerCreateGifos.querySelector(".num2").style.backgroundColor = "#572EE5";
            containerCreateGifos.querySelector(".num2").style.color = "white";
            containerCreateGifos.querySelector(".num1").style.backgroundColor = "white";
            containerCreateGifos.querySelector(".num1").style.color = "#572EE5";
            recorder.startRecording();
            recordStarted = true;
            timerRecording();
        })
        // recorder.stopRecording(function() {              // stop the recording
        //     let blob = recorder.getBlob();               // getBlob inside callback function
        //     invokeSaveAsDialog(blob);                    //stopRecording: function(blobURL) {},
        // });

        btnFinalizar.addEventListener("click", function stopRecording() {
            recorder.stopRecording(async function () {
                const blob = this.blob;
                recordStarted = false;
                let form = new FormData();
                form.append('file', recorder.getBlob(), 'misGifos.gif');        //info para subir a giphy
                btnFinalizar.style.display = "none";
                btnSubir.style.display = "block";
                const { data:gifData } =  await uploadGif(form);
                previewGif(gifData);
                btnRepeat.style.display = "block";
                btnRepeat.innerHTML = "REPETIR CAPTURA";
                btnRepeat.addEventListener("click", function repeatGifo() {
                    btnSubir.style.display = "none";
                    btnRepeat.style.display = "none";
                    getStreamAndRecord();
                    containerCreateGifos.querySelector(".num2").style.backgroundColor = "white";
                    containerCreateGifos.querySelector(".num2").style.color = "#572EE5";
                    containerCreateGifos.querySelector(".num1").style.backgroundColor = "#572EE5";
                    containerCreateGifos.querySelector(".num1").style.color = "white";
                });
            })
        })
    }).catch(function(err) { console.log(err.name + ": " + err.message); });
};
btnComenzar.addEventListener("click", getStreamAndRecord); //que el video aparezca o desaparezca según haga falta, esto se puede resolver con listeners e interactuando con el DOM.

btnSubir.addEventListener('click', function (ev) {
    const actualPreviewId = document.querySelector('.preview').getAttribute('data-id');
    const previewUrl = document.querySelector('.preview').getAttribute('src');              //no se lo envié
    const misGifos = JSON.parse(localStorage.getItem('misGifos')) || [];
    misGifos.push(actualPreviewId);
    localStorage.setItem('misGifos',JSON.stringify(misGifos));
    containerCreateGifos.querySelector(".num2").style.backgroundColor = "white";
    containerCreateGifos.querySelector(".num2").style.color = "#572EE5";
    containerCreateGifos.querySelector(".num3").style.backgroundColor = "#572EE5";
    containerCreateGifos.querySelector(".num3").style.color = "white";
    btnRepeat.style.display = "none";
    btnSubir.style.display = "none";
    document.querySelector(".containerVideo").style.backgroundColor = "#572EE5";
    document.querySelector(".loadingUpload").style.display = 'block';                               //Loading upload
    
    setTimeout(() => {
        document.querySelector(".loadingUpload").style.display = 'none';
        document.querySelector(".uploadCheck").style.display = 'block';                             //Loading check
        
        const downloadPreview = async (ev) => {                                                     //DOWNLOAD
            const id = document.querySelector('.preview').getAttribute('data-id');
            let downloadUrl = await fetch(`https://media2.giphy.com/media/${id}/giphy.gif`);
            let file = await downloadUrl.blob();  
            const anchor = document.createElement('a');  
            const urlGifs = URL.createObjectURL(file);
            anchor.href = urlGifs;
            const titleGif = document.querySelector('.preview').alt;
            anchor.download = `${titleGif}.gif`;
            anchor.style = 'display: "none"';
            document.body.appendChild(anchor);
            anchor.click();                              
            document.body.removeChild(anchor);
        };
        containerCreateGifos.querySelector('.downloadIcon').addEventListener("click", downloadPreview);
      
        const linkPreview = async (ev) => {                                             //LINK
            // btnLink.href = previewUrl;
            const idGifo = document.querySelector('.preview').getAttribute('data-id');
            // const urlLink = `https://i.giphy.com/${idGifo}.gif`;          
            btnLink = ev.target;                            // btnLink.setAttribute('href', urlLink);
            location.href = `https://i.giphy.com/${idGifo}.gif`;
            console.log(btnLink.href);
        };
        containerCreateGifos.querySelector('.btnLink').addEventListener("click", linkPreview);

        setTimeout(() => {          //luego de subir el gif, se recarga la página
            location.reload();
        }, 15000);
    }, 5000);
});

function timerRecording() {
    let seconds = 0;
    let minute = 0;
    let timer = setInterval(() => {
        if (recordStarted === true) {                                                             //recorder.start()
            if (seconds < 60) {
                if (seconds <= 9) {
                    seconds = '0' + seconds;
                }
                // document.querySelector(".containerNumbers").style.paddingLeft = '9em';
                btnRepeat.style.display = "block";
                btnRepeat.innerHTML = `00:0${minute}:${seconds}`;
                seconds++;
            }else{
                minute++;
                seconds = 0;
            }
        }
        else{
            clearInterval(timer)
        }
    }, 1000);
}

//LÓGICA
// StartRecording: comienza la grabación y no requiere de ningún parámetro extra.

// StopRecording: recibe como parámetro un callback, donde se indica qué hacer con la información grabada 
//una vez que se para la grabación.

//getBlob(): es un método del objeto recorder creado con RecordRTC que permite acceder a los datos grabados. 
//Un blob es una manera de guardar datos que eventualmente se puede transformar en un archivo para ser 
//leído por el sistema operativo.

//FormData: es un objeto que permite darle formato clave valor a tu información para enviarla de manera 
//ordenada a través de body de un POST. Para agregar información se utiliza un método del objeto llamado
// .append que recibe dos parámetros clave y valor.