//PASOS: Pedir permisos, grabar y subir a giphy
const containerCreateGifos = document.getElementById("containerCreateGifos");
const containerVideo = document.querySelector(".containerVideo");

const btnComenzar = document.querySelector(".comenzar");
const btnGrabar = document.querySelector(".grabar");
const btnFinalizar = document.querySelector(".finalizar");
const btnSubir = document.querySelector(".subir");

const uploadEndpoint = 'http://upload.giphy.com/v1/gifs?api_key=u97suGng8xUtL28uyoZRwdmODNFgxzIY';

async function uploadGif(formData){
    const response = await fetch(uploadEndpoint,{
        method: "POST",
        body: formData
    });
    return response.json()
}

function previewGif ({id}) {
    containerVideo.innerHTML= `<img class='preview' data-id='${id}' src='https://i.giphy.com/${id}.gif' />`;
}

btnSubir.addEventListener('click', function (ev) {
    const actualPreviewId = document.querySelector('.preview').getAttribute('data-id')  //CREAR CLASS PREVIEW
    const misGifos = JSON.parse(localStorage.getItem('misGifos')) || [];
    misGifos.push(actualPreviewId);
    localStorage.setItem('misGifos',JSON.stringify(misGifos));
})


const startVideo = () =>{                                     //función que inicie las funciones de captura.
    containerVideo.innerHTML = '<video>';
    containerVideo.style.paddingTop = "23em";
    btnComenzar.style.display = "none";
    // const text = containerCreateGifos.querySelector("text");
    // text.style.display = "none";
    btnGrabar.style.display = "block";
}

function getStreamAndRecord() {         //Devuelve una promesa,manejar la respuesta de manera asíncrona. 
    startVideo();
    const video = document.querySelector("video");

    navigator.mediaDevices.getUserMedia({                           //este es el prompt pidiendo permiso
        audio: false,                                               //constraints 
        video: {width: 550, height: 380}
    }).then(function(stream) {          //Una vez que tienes tu stream,      
        video.srcObject = stream;      //puedes utilizarlo como src de la tag <video/> y llamar play() para que comience a reproducirse.
        video.play();

        const recorder = RecordRTC(stream, {            //El archivo está en memoria, es el BLOB
            type: 'gif',
            // frameRate: 1,
            // quality: 10,
            // width: 360,
            // hidden: 240,
        });                           

        btnGrabar.addEventListener('click', function(){
            btnGrabar.style.display = "none";
            btnFinalizar.style.display = "block";
            recorder.startRecording();
        })
        // recorder.stopRecording(function() {              // stop the recording
        //     let blob = recorder.getBlob();               // getBlob inside callback function
        //     invokeSaveAsDialog(blob);                    //stopRecording: function(blobURL) {},
        // });
        btnFinalizar.addEventListener("click", function stopRecording() {
                recorder.stopRecording(async function () {
                const blob = this.blob;
                let form = new FormData();
                form.append('file', recorder.getBlob(), 'misGifos.gif');
                btnFinalizar.style.display = "none";
                const { data:gifData } =  await uploadGif(form);
                btnSubir.style.display = "block";
                previewGif(gifData);
            })
        })
    }).catch(function(err) { console.log(err.name + ": " + err.message); });
};

btnComenzar.addEventListener("click", getStreamAndRecord); //que el video aparezca o desaparezca según haga falta, esto se puede resolver con listeners e interactuando con el DOM.