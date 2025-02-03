// Listas de sujetos, verbos y predicados (triplicadas)
const sujetos = [
    "El gato", "El perro", "La niña", "El hombre", "La mujer",
    "El pájaro", "El niño", "El profesor", "La abuela", "El coche",
    "La bicicleta", "El árbol", "El libro", "La silla", "El teléfono"
];
const verbos = [
    "come", "corre", "salta", "lee", "escribe",
    "canta", "baila", "nada", "vuela", "dibuja",
    "construye", "rompe", "repara", "observa", "escucha"
];
const predicados = [
    "en la casa", "en el parque", "bajo la lluvia", "sobre la mesa", "en el jardín",
    "en la montaña", "en el río", "en la playa", "en el bosque", "en la ciudad",
    "en el coche", "en la escuela", "en el trabajo", "en el supermercado", "en el cine"
];

// Elementos del DOM
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
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

// Función para generar una frase aleatoria (correcta o incorrecta)
function generarFrase() {
    const sujeto = sujetos[Math.floor(Math.random() * sujetos.length)];
    const verbo = verbos[Math.floor(Math.random() * verbos.length)];
    const predicado = predicados[Math.floor(Math.random() * predicados.length)];

    // Decidir si la frase será correcta o incorrecta (50% de probabilidad)
    const esCorrecta = Math.random() < 0.5;
    if (!esCorrecta) {
        // Hacer la frase incorrecta (cambiar el verbo para que no concuerde)
        const verboIncorrecto = verbos[Math.floor(Math.random() * verbos.length)];
        fraseActual = `${sujeto} ${verboIncorrecto} ${predicado}`;
    } else {
        fraseActual = `${sujeto} ${verbo} ${predicado}`;
    }

    fraseElement.textContent = fraseActual;
    tiempoInicio = Date.now(); // Iniciar el cronómetro
}

// Función para evaluar la respuesta
function evaluarRespuesta(esCorrecta) {
    const tiempoReaccion = Date.now() - tiempoInicio; // Calcular tiempo de reacción en ms
    tiemposReaccion.push(tiempoReaccion); // Guardar el tiempo de reacción

    // Ocultar la frase
    fraseElement.textContent = "";

    // Mostrar el tiempo de reacción
    mensajeElement.textContent = `Tiempo de reacción: ${tiempoReaccion} ms`;
    mensajeElement.style.color = "black";

    // Verificar si la respuesta es correcta
    const fraseEsCorrecta = esFraseCorrecta(fraseActual);
    if (esCorrecta !== fraseEsCorrecta) {
        respuestasIncorrectas++;
        mensajeElement.textContent += " | -200 (Incorrecto)";
        mensajeElement.style.color = "red";
    } else {
        mensajeElement.textContent += " | Correcto";
        mensajeElement.style.color = "green";
    }

    contadorFrases++;

    if (contadorFrases === 10) {
        finalizarJuego();
    } else {
        // Espacio en blanco de 500 ms antes de la siguiente frase
        setTimeout(generarFrase, 500);
    }
}

// Función para verificar si una frase es correcta
function esFraseCorrecta(frase) {
    const [sujeto, verbo] = frase.split(" ");
    return verbos.includes(verbo); // Verificar si el verbo es correcto
}

// Función para finalizar el juego
function finalizarJuego() {
    clearInterval(intervalo); // Detener el temporizador
    const tiempoTotal = tiemposReaccion.reduce((a, b) => a + b, 0);
    const tiempoPromedio = (tiempoTotal + respuestasIncorrectas * 200) / 10; // Añadir penalización
    resultadoElement.textContent = `Tiempo promedio de reacción: ${tiempoPromedio.toFixed(0)} ms`;
    resultadoElement.style.color = "black";
    startButton.disabled = false; // Habilitar el botón "Start"
    stopButton.disabled = true; // Deshabilitar el botón "Stop"
    limpiarPantalla();
}

// Función para limpiar la pantalla
function limpiarPantalla() {
    fraseElement.textContent = "";
    mensajeElement.textContent = "";
}

// Función para detener el juego
function detenerJuego() {
    clearInterval(intervalo); // Detener el temporizador
    startButton.disabled = false; // Habilitar el botón "Start"
    stopButton.disabled = true; // Deshabilitar el botón "Stop"
    limpiarPantalla();
    resultadoElement.textContent = "Juego detenido";
}

// Evento para iniciar el juego
startButton.addEventListener("click", () => {
    startButton.disabled = true; // Deshabilitar el botón "Start"
    stopButton.disabled = false; // Habilitar el botón "Stop"
    contadorFrases = 0;
    tiemposReaccion = [];
    respuestasIncorrectas = 0;
    resultadoElement.textContent = "";
    limpiarPantalla();
    generarFrase();
});

// Evento para detener el juego
stopButton.addEventListener("click", detenerJuego);

// Eventos de los botones
okButton.addEventListener("click", () => evaluarRespuesta(true));
noButton.addEventListener("click", () => evaluarRespuesta(false));
