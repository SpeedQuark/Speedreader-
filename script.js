// Listas de sujetos, verbos y predicados
const sujetos = ["El gato", "El perro", "La niña", "El hombre", "La mujer"];
const verbos = ["come", "corre", "salta", "lee", "escribe"];
const predicados = ["en la casa", "en el parque", "bajo la lluvia", "sobre la mesa", "en el jardín"];

// Elementos del DOM
const startButton = document.getElementById("start");
const fraseElement = document.getElementById("frase");
const okButton = document.getElementById("ok");
const noButton = document.getElementById("no");
const mensajeElement = document.getElementById("mensaje");
const resultadoElement = document.getElementById("resultado");

let fraseActual = "";
let tiempoInicio = 0;
let tiemposReaccion = [];
let respuestasIncorrectas = 0;
let contadorFrases = 0;
let intervalo;

// Función para generar una frase aleatoria
function generarFrase() {
    const sujeto = sujetos[Math.floor(Math.random() * sujetos.length)];
    const verbo = verbos[Math.floor(Math.random() * verbos.length)];
    const predicado = predicados[Math.floor(Math.random() * predicados.length)];
    fraseActual = `${sujeto} ${verbo} ${predicado}`;
    fraseElement.textContent = fraseActual;
    tiempoInicio = Date.now(); // Iniciar el cronómetro
}

// Función para evaluar la respuesta
function evaluarRespuesta(esCorrecta) {
    const tiempoReaccion = Date.now() - tiempoInicio; // Calcular tiempo de reacción
    tiemposReaccion.push(tiempoReaccion); // Guardar el tiempo de reacción

    if (!esCorrecta) {
        respuestasIncorrectas++;
        mensajeElement.textContent = "-200";
        mensajeElement.style.color = "red";
    } else {
        mensajeElement.textContent = "Correcto";
        mensajeElement.style.color = "green";
    }

    contadorFrases++;

    if (contadorFrases === 10) {
        finalizarJuego();
    } else {
        setTimeout(() => {
            mensajeElement.textContent = "";
            generarFrase();
        }, 2000); // Esperar 2 segundos antes de la siguiente frase
    }
}

// Función para finalizar el juego
function finalizarJuego() {
    clearInterval(intervalo); // Detener el temporizador
    const tiempoTotal = tiemposReaccion.reduce((a, b) => a + b, 0);
    const tiempoPromedio = (tiempoTotal + respuestasIncorrectas * 200) / 10; // Añadir penalización
    resultadoElement.textContent = `Tiempo promedio de reacción: ${(tiempoPromedio / 1000).toFixed(2)} segundos`;
    resultadoElement.style.color = "black";
}

// Evento para iniciar el juego
startButton.addEventListener("click", () => {
    startButton.disabled = true; // Deshabilitar el botón "Start"
    contadorFrases = 0;
    tiemposReaccion = [];
    respuestasIncorrectas = 0;
    resultadoElement.textContent = "";
    generarFrase();
});

// Eventos de los botones
okButton.addEventListener("click", () => evaluarRespuesta(true));
noButton.addEventListener("click", () => evaluarRespuesta(false));
