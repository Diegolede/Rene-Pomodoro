document.addEventListener('DOMContentLoaded', () => {
    let timer; 
    let timeLeft = 25 * 60; 
    const workDuration = 25 * 60; 
    const breakDuration = 5 * 60; 
    const timerDisplay = document.querySelector('.timer'); 
    const playButton = document.getElementById('play'); 
    const pauseButton = document.getElementById('pause'); 

   
    const notificationSound = new Audio('assets/audio/notification.mp3');

    
    notificationSound.addEventListener('error', (e) => {
        console.error("Error al cargar el audio:", e);
    });

   
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    
    function startTimer() {
        if (!timer) { 
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                } else {
                    clearInterval(timer);
                    timer = null; 
                    notificationSound.play(); 
                    alert("¡Tiempo terminado! Ahora es tiempo de descanso.");
                    startBreak(); 
                }
            }, 1000);
        }
    }

   
    function startBreak() {
        timeLeft = breakDuration; 
        updateTimer(); 
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timer);
                timer = null; 
                notificationSound.play(); 
                alert("¡Descanso terminado! Vuelve al trabajo.");
                timeLeft = workDuration; 
                updateTimer(); 
            }
        }, 1000);
    }

   
    function pauseTimer() {
        clearInterval(timer);
        timer = null; 
    }

    
    playButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);

    
    updateTimer();
});


function obtenerRutasGIFs() {
    return [
        "assets/img/gif1.gif",
        "assets/img/gif2.gif",
        "assets/img/gif4.gif",
        "assets/img/gif5.gif",
        "assets/img/gif6.gif"
    ];
}

let gifs = obtenerRutasGIFs();

function cambiarGif() {
    let indice = Math.floor(Math.random() * gifs.length);
    document.getElementById("miGif").src = gifs[indice];
    console.log("GIF cambiado a:", gifs[indice]); 
}


window.onload = cambiarGif;

const sonido = new Audio('assets/audio/botonaudio.mp3')

const botonPlay = document.getElementById ("play");
const botonPause = document.getElementById ("pause");

botonPlay.addEventListener("click" , () => {
    sonido.play();
})

botonPause.addEventListener("click" , () => {
    sonido.play();
})

