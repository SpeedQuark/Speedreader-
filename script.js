// Listas de sujetos, verbos y predicados
const sujetos = ["El gato", "El perro", "La niña", "El hombre", "La mujer"];
const verbos = ["come", "corre", "salta", "lee", "escribe"];
const predicados = ["en la casa", "en el parque", "bajo la lluvia", "sobre la mesa", "en el jardín"];

// Elementos del DOM
const fraseElement = document.getElementById("frase");
const okButton = document.getElementById("ok");
const noButton = document.getElementById("no");
const mensajeElement = document.getElementById("mensaje");

let fraseActual = "";
let intervalo;

// Función para generar una frase aleatoria
function generarFrase() {
    const sujeto = sujetos[Math.floor(Math.random() * sujetos.length)];
    const verbo = verbos[Math.floor(Math.random() * verbos.length)];
    const predicado = predicados[Math.floor(Math.random() * predicados.length)];
    fraseActual = `${sujeto} ${verbo} ${predicado}`;
    fraseElement.textContent = fraseActual;
}

// Función para evaluar la respuesta
function evaluarRespuesta(esCorrecta) {
    clearInterval(intervalo); // Detener el temporizador
    if (esCorrecta) {
        mensajeElement.textContent = "Correcto";
        mensajeElement.style.color = "green";
    } else {
        mensajeElement.textContent = "Incorrecto";
        mensajeElement.style.color = "red";
    }
    setTimeout(() => {
        mensajeElement.textContent = "";
        iniciarJuego();
    }, 2000); // Reiniciar después de 2 segundos
}

// Función para iniciar el juego
function iniciarJuego() {
    generarFrase();
    intervalo = setInterval(generarFrase, 2000); // Cambiar frase cada 2 segundos
}

// Eventos de los botones
okButton.addEventListener("click", () => evaluarRespuesta(true));
noButton.addEventListener("click", () => evaluarRespuesta(false));

// Iniciar el juego al cargar la página
iniciarJuego();
