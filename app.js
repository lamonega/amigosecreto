/**
 * @file app.js
 * @description Lógica principal para la aplicación de sorteo "Amigo Secreto".
 * Gestiona la lista de participantes, realiza el sorteo eligiendo un ganador
 * y permite reiniciar el juego.
 */

// Array que almacena la lista de nombres de los amigos participantes. 
// Funciona como el estado principal de la aplicación.
let amigos = [];

/**
 * @function agregarAmigo
 * @description Añade un nuevo participante a la lista de amigos desde el campo de entrada.
 * Realiza validaciones para evitar nombres vacíos o duplicados (ignorando mayúsculas/minúsculas).
 * Actualiza la interfaz de usuario para reflejar la lista actual de participantes.
 */
function agregarAmigo() {
    // Obtiene los elementos del DOM con los que vamos a interactuar.
    const inputAmigo = document.getElementById('amigo');
    const listaAmigosDOM = document.getElementById('listaAmigos');
    
    // Obtiene el valor del input y usa trim() para eliminar espacios en blanco al inicio y al final.
    const nombreAmigo = inputAmigo.value.trim();

    // Validación 1: Evita que se agreguen nombres vacíos.
    if (nombreAmigo === '') {
        alert('Por favor, escribe un nombre antes de añadir.');
        return; // Detiene la ejecución de la función si el campo está vacío.
    }

    // Validación 2: Evita nombres duplicados.
    // Se convierten todos los nombres a minúsculas para una comparación insensible a mayúsculas/minúsculas.
    if (amigos.map(amigo => amigo.toLowerCase()).includes(nombreAmigo.toLowerCase())) {
        alert('Este nombre ya ha sido añadido. Por favor, elige otro.');
        inputAmigo.value = ''; // Limpia el campo para corregir.
        return; // Detiene la ejecución si el nombre ya existe.
    }

    // Si las validaciones pasan, se añade el amigo al array.
    amigos.push(nombreAmigo);
    // Se actualiza la lista en el DOM para que el usuario vea los nombres añadidos.
    listaAmigosDOM.textContent = 'Amigos: ' + amigos.join(', ');

    // Limpia el campo de entrada y le devuelve el foco para facilitar la adición de más nombres.
    inputAmigo.value = '';
    inputAmigo.focus();
}

/**
 * @function sortearAmigo
 * @description Realiza el sorteo seleccionando un único ganador al azar de la lista `amigos`.
 * Muestra el resultado en pantalla y hace visible el botón para reiniciar el juego.
 */
function sortearAmigo() {
    // Validación: Se requieren al menos 2 participantes para que el sorteo tenga sentido.
    if (amigos.length < 2) {
        alert('Debes añadir al menos 2 amigos para poder realizar un sorteo.');
        return;
    }

    // Genera un índice aleatorio dentro del rango del array de amigos.
    // 1. Math.random() genera un número flotante entre 0 (inclusive) y 1 (exclusive).
    // 2. Se multiplica por amigos.length para escalar el número al rango de índices del array.
    // 3. Math.floor() redondea hacia abajo para obtener un índice de array válido (ej: 0, 1, 2...).
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    // Selecciona al ganador del array 'amigos' usando el índice aleatorio que acabamos de generar.
    const ganador = amigos[indiceAleatorio];

    // Muestra el nombre del ganador en el elemento de resultados del DOM.
    const resultadoDOM = document.getElementById('resultado');
    resultadoDOM.textContent = `¡El amigo secreto elegido es: ${ganador}!`;

    // Hace visible el botón de reiniciar, ya que el sorteo ha finalizado.
    document.getElementById('boton-reiniciar').hidden = false;
}

/**
 * @function reiniciar
 * @description Restablece el juego a su estado inicial.
 * Limpia la lista de amigos, borra el resultado del sorteo de la pantalla
 * y oculta el botón de reinicio.
 */
function reiniciar() {
    // Restablece el estado principal del juego vaciando el array de amigos.
    amigos = [];
    
    // Limpia los elementos de la interfaz que mostraban información del juego anterior.
    document.getElementById('listaAmigos').textContent = '';
    document.getElementById('resultado').textContent = '';
    
    // Devuelve el foco al campo de entrada para que el usuario pueda empezar de nuevo fácilmente.
    document.getElementById('amigo').focus();

    // Oculta el botón de "Reiniciar", ya que el juego está en su estado inicial.
    document.getElementById('boton-reiniciar').hidden = true;
}