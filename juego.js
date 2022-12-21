//Función para dibujar el tablero recibiendo parametros iniciales
function dibujarTablero() {
  cargaInicial = 0;
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // Crear celdas
  for (var i = 0; i < 8; i++) {
    var hilera = document.createElement("tr");

    for (var j = 0; j < 8; j++) {
      var celda = document.createElement("td");
      celda.id = i + "-" + j;
      indice = i + j;
      if (indice % 2 == 0) {
        celda.className = "casilla-blanca";
      } else {
        celda.className = "casilla-negra";
      }

      hilera.appendChild(celda);
    }

    tblBody.appendChild(hilera);
  }
  tabla.appendChild(tblBody);
  marcoTablero.appendChild(tabla);

  //Verificar la sesion actual si hay una partida iniciada
  if (sessionStorage.getItem("PartidaActual")) {
    recargarSesionActual();
  }
}

//Función para posicionar las fichas en el tablero
function dibujarFichas(
  ArrayJuega,
  nomJugador1,
  nomJugador2,
  puntosJuega1,
  puntosJuega2,
  turnoJuega
) {
  document.getElementById("nombreJugador1").textContent = nomJugador1;
  document.getElementById("nombreJugador2").textContent = nomJugador2;
  document.getElementById("puntos1").value = puntosJuega1;
  document.getElementById("puntos2").value = puntosJuega2;
  document.getElementById("turno-jugador").textContent =
    "Le toca mover al jugador: " + turnoJuega;
  // Recorrer filas
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var nombreCelda = i + "-" + j;
      var celda = document.getElementById(nombreCelda);
      celda.id = i + "-" + j;
      indice = i + j;
      if (indice % 2 == 0) {
        celda.className = "casilla-blanca";
      } else {
        celda.className = "casilla-negra";
      }

      celda.classList.remove("ficha-blanca");
      celda.classList.remove("ficha-negra");

      //Ubicar fichas según la posicion de la celda
      if (ArrayJuega[i][j] == 1) {
        celda.classList.add("ficha-blanca");
      } else if (ArrayJuega[i][j] == 2) {
        celda.classList.add("ficha-negra");
      }
    }
  }
  //Función que almacena los datos de juego de la sesión actual
  guardarSesionActual();
}

//Función cargar una nueva partida
function cargarNuevaPartida() {
  //Verificar si es la primera vez que se cargan fichas  variable cargaInicial
  if (cargaInicial == 0) {
    cargarTableroNuevo();
    window.alert("La partida se ha iniciado");

    //Primera vez que se carga el tablero toma el valor 1
    cargaInicial = 1;
  } else {
    if (window.confirm("Borrará la partida actual. Desea continuar?")) {
      cargarTableroNuevo();
      window.alert("Ha iniciado una nueva Partida");
      juegoFinalizado = 0;
    }
  }
}

//Función cargar una nueva partida
function cargarNuevaPartida() {
  //Verificar si es la primera vez que se cargan fichas  variable cargaInicial
  if (cargaInicial == 0) {
    cargarTableroNuevo();
    window.alert("La partida se ha iniciado");

    //Primera vez que se carga el tablero toma el valor 1
    cargaInicial = 1;
  } else {
    if (window.confirm("Borrará la partida actual. Desea continuar?")) {
      cargarTableroNuevo();
      window.alert("Ha iniciado una nueva Partida");
      juegoFinalizado = 0;
    }
  }
}

//Función cargar el tablero en una nueva partida
function cargarTableroNuevo() {
  nombreJugador1 = prompt("Ingrese el nombre del Jugador 1", "Jugador 1");
  nombreJugador2 = prompt("Ingrese el nombre del Jugador 2", "Jugador 2");
  ArrayInicial = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ];

  puntosJugador1 = 12;
  puntosJugador2 = 12;
  turnoJugador = 1;

  //Digujar tablero
  dibujarFichas(
    ArrayInicial,
    nombreJugador1,
    nombreJugador2,
    puntosJugador1,
    puntosJugador2,
    turnoJugador
  );
}
