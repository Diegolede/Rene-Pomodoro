document.addEventListener('DOMContentLoaded', () => {
    let timer; 
    let timeLeft = 20 * 60; // Tiempo inicial en segundos (20 minutos)
    const workDurationOptions = [15, 20, 25, 30]; // Opciones de duración de trabajo
    let currentWorkDurationIndex = 0; // Índice para la duración de trabajo actual
    const timerDisplay = document.querySelector('.timer'); 
    const playPauseButton = document.getElementById('play-pause'); 
    const playPauseIcon = document.getElementById('play-pause-icon'); 
    const workTimeButton = document.getElementById('work-time'); 
    const workTimeDisplay = document.getElementById('work-time-display'); 
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
                    try {
                        notificationSound.play(); 
                    } catch (error) {
                        console.error("Error al reproducir el sonido de notificación:", error);
                    }
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
                try {
                    notificationSound.play(); 
                } catch (error) {
                    console.error("Error al reproducir el sonido de notificación:", error);
                }
                alert("¡Descanso terminado! Vuelve al trabajo.");
                timeLeft = workDurationOptions[currentWorkDurationIndex] * 60; // Reiniciar con el tiempo de trabajo actual
                updateTimer(); 
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
        timer = null; 
    }

    function handleButtonClick() {
        const sonido = new Audio('assets/audio/botonaudio.mp3');
        sonido.play().catch(error => {
            console.error("Error al reproducir el sonido del botón:", error);
        });
    }

    playPauseButton.addEventListener('click', () => {
        if (timer) {
            pauseTimer();
            playPauseIcon.src = 'assets/img/icons/Play.svg'; // Cambiar a icono de Play
        } else {
            startTimer();
            playPauseIcon.src = 'assets/img/icons/Pause.svg'; // Cambiar a icono de Pause
        }
        handleButtonClick();
    });

    workTimeButton.addEventListener('click', () => {
        currentWorkDurationIndex = (currentWorkDurationIndex + 1) % workDurationOptions.length; // Cambiar al siguiente tiempo
        timeLeft = workDurationOptions[currentWorkDurationIndex] * 60; // Actualizar el tiempo restante
        workTimeDisplay.textContent = workDurationOptions[currentWorkDurationIndex]; // Actualizar la visualización
        updateTimer(); // Actualizar el temporizador en pantalla
    });

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
let currentGif = "";

function cambiarGif() {
    let indice = Math.floor(Math.random() * gifs.length);
    while (gifs[indice] === currentGif) {
        indice = Math.floor(Math.random() * gifs.length);
    }
    currentGif = gifs[indice];
    const gifImage = document.getElementById("miGif");
    gifImage.src = currentGif;
    gifImage.onerror = () => {
        console.error("Error al cargar el GIF:", currentGif);
    };
    console.log("GIF cambiado a:", currentGif); 
}

window.onload = cambiarGif;
