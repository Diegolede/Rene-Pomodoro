document.addEventListener('DOMContentLoaded', () => {
    let timer; // Variable para almacenar el temporizador
    let timeLeft = 20 * 60; // 15 minutos para el tiempo de trabajo
    const workDuration = 20 * 60; // Duración del trabajo en segundos
    const breakDuration = 5 * 60; // Duración del descanso en segundos
    const timerDisplay = document.querySelector('.timer'); // Seleccionar el elemento del temporizador
    const playButton = document.getElementById('play'); // Botón de play
    const pauseButton = document.getElementById('pause'); // Botón de pausa

    // Cargar el audio de notificación
    const notificationSound = new Audio('assets/audio/notification.mp3');

    // Agregar un manejador de errores
    notificationSound.addEventListener('error', (e) => {
        console.error("Error al cargar el audio:", e);
    });

    // Función para actualizar el temporizador
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Función para iniciar el temporizador
    function startTimer() {
        if (!timer) { // Solo iniciar si no hay un temporizador en ejecución
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                } else {
                    clearInterval(timer);
                    timer = null; // Reiniciar el temporizador
                    notificationSound.play(); // Reproducir sonido de notificación
                    alert("¡Tiempo terminado! Ahora es tiempo de descanso.");
                    startBreak(); // Iniciar el descanso
                }
            }, 1000);
        }
    }

    // Función para iniciar el descanso
    function startBreak() {
        timeLeft = breakDuration; // Establecer el tiempo de descanso
        updateTimer(); // Actualizar el temporizador en la pantalla
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timer);
                timer = null; // Reiniciar el temporizador
                notificationSound.play(); // Reproducir sonido de notificación
                alert("¡Descanso terminado! Vuelve al trabajo.");
                timeLeft = workDuration; // Reiniciar el tiempo de trabajo
                updateTimer(); // Actualizar el temporizador en la pantalla
            }
        }, 1000);
    }

    // Función para pausar el temporizador
    function pauseTimer() {
        clearInterval(timer);
        timer = null; // Reiniciar el temporizador
    }

    // Asignar eventos a los botones
    playButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);

    // Inicializar el temporizador en la pantalla
    updateTimer();
});

// Función para obtener rutas de GIFs
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
    console.log("GIF cambiado a:", gifs[indice]); // Verifica qué GIF se está cargando
}

// Asegúrate de que se llame a cambiarGif al cargar la página
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

