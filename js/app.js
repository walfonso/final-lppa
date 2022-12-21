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

//Agregar un eventListener sobre el click en las caillas
marcoTablero.addEventListener("click", (e) => {
  seleccionarCasilla(e);
});

//Seleccionar Casilla
var seleccionarCasilla = (e) => {
  console.log(e.target);
  console.log("posicion anterior: " + posicionMarcada);

  //Antes seleccionar la ficha, verificar si la partida ya termino, si no es asi, ejecuta el movimiento
  if (juegoFinalizado == 0) {
    //Seleccionar ficha blanca
    if (e.target.classList.contains("ficha-blanca")) {
      if (turnoJugador == 1) {
        if (e.target.classList.contains("casilla-seleccionada") !== true) {
          e.target.classList.add("casilla-seleccionada");
          if (posicionMarcada !== "ninguna") {
            var casillaDesmarca = document.getElementById(posicionMarcada);
            casillaDesmarca.classList.remove("casilla-seleccionada");
          }
        }
        //Guardar la nueva posición marcada actual
        posicionMarcada = e.target.id;
      } else if (turnoJugador == 2) {
        mensaje = "Es el turno del Jugador 2, Fichas negras!";
        window.alert(mensaje);
      }
    } else if (e.target.classList.contains("ficha-negra")) {
      if (turnoJugador == 2) {
        if (e.target.classList.contains("casilla-seleccionada") !== true) {
          e.target.classList.add("casilla-seleccionada");
          if (posicionMarcada !== "ninguna") {
            var casillaDesmarca = document.getElementById(posicionMarcada);
            casillaDesmarca.classList.remove("casilla-seleccionada");
          }
        }
        posicionMarcada = e.target.id;
      } else if (turnoJugador == 1) {
        mensaje = "Es el turno del Jugador 1, Fichas blancas!";
        window.alert(mensaje);
      }
    } else {
      if (posicionMarcada !== "ninguna") {
        var casillaDesmarca = document.getElementById(posicionMarcada);

        //Ubicar las fichas segun la posicion de la celda, si esta en alguno de los arreglos de posición
        if (
          casillaDesmarca.classList.contains("ficha-blanca") &&
          turnoJugador == 1 &&
          casillaValidaMovimiento("blancas", posicionMarcada, e.target.id)
        ) {
          //Verificar una casilla seleccionada con ficha blanca y  turno
          //Mover la ficha a la nueva casilla
          e.target.classList.add("ficha-blanca");

          //Quitar la ficha de la casilla anterior
          casillaDesmarca.classList.remove("ficha-blanca");

          //Quitar la marca de seleccion de casilla
          casillaDesmarca.classList.remove("casilla-seleccionada");

          //Guardar la nueva posicion marcada actual
          posicionMarcada = e.target.id;

          //Enviar datos a la API servidor remoto
          enviarDatosServidor(turnoJugador, posicionMarcada);

          //Asignar turno al otro jugador
          console.log("Turno jugador 2, fichas negras");
          turnoJugador = 2;

          //Actualizar Turno
          document.getElementById("turno-jugador").textContent =
            "Mueve el jugador: " + turnoJugador;

          //Verificar si hay ganador luego del movimiento
          HayGanador();
        } else if (
          casillaDesmarca.classList.contains("ficha-negra") &&
          turnoJugador == 2 &&
          casillaValidaMovimiento("negras", posicionMarcada, e.target.id)
        ) {
          e.target.classList.add("ficha-negra");
          casillaDesmarca.classList.remove("ficha-negra");
          casillaDesmarca.classList.remove("casilla-seleccionada");
          posicionMarcada = e.target.id;
          enviarDatosServidor(turnoJugador, posicionMarcada);
          console.log("Proximo turno jugador 1, fichas blancas");
          turnoJugador = 1;
          document.getElementById("turno-jugador").textContent =
            "Mueve el jugador: " + turnoJugador;
          HayGanador();
        }
      }
    }
  }
  //Partida finalizada, no hay seleccion de fichas
  else {
    window.alert("La Partida ha Finalizado: " + mensaje);
  }

  console.log("posicion nueva: " + posicionMarcada);

  //Se llama Función para guardar la sesión actual
  guardarSesionActual();
};
