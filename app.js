//Declaración de variables globales
// Carga inicial del tablero
var cargaInicial;
var posicionMarcada = "ninguna";
var mensaje = "";

//Declaración de variable global: Establecer que el juego ha terminado
//                                Y no se puede seguir moviendo fichas
var juegoFinalizado = 0;

//Verificar  movimientos posibles de las fichas
var hayMovimientosPosiblesB;
var hayMovimientosPosiblesN;

//Arreglo con las posiciones inciales de las fichas
var ArrayInicial = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
];

//Puntos Jugadores
var puntosJugador1 = 0;
var puntosJugador2 = 0;

//Proximo turno indica elJugador
var turnoJugador = 1;

//Arreglos que contienen de la partida
var partidaActual = [];
var partidaGuardada = [];
var partidaGanada = [];
var arraypartidasGanadas = [];

//Obtener la referencia del elemento body
var marcoTablero = document.getElementById("tablero-marco");
