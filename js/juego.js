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

//Función verificar casilla válida para movimiento
function casillaValidaMovimiento(colorFichas, posicionAnterior, posicionNueva) {
  //creo variables de comparacion de posicion fila y columna
  var filaAnterior = parseInt(posicionAnterior.substring(0, 1));
  var columnaAnterior = parseInt(posicionAnterior.substring(2));
  var filaNueva = parseInt(posicionNueva.substring(0, 1));
  var columnaNueva = parseInt(posicionNueva.substring(2));

  //Salidas de control
  console.log("Color fichas: " + colorFichas);
  console.log("Posicion anterior: " + posicionAnterior);
  console.log("Posicion nueva: " + posicionNueva);
  console.log("----------------------------------------------");
  console.log("Fila anterior: " + filaAnterior);
  console.log("Columna anterior: " + columnaAnterior);
  console.log("Fila nueva: " + filaNueva);
  console.log("Columna nueva: " + columnaNueva);

  //Verificar según el color de ficha, que quien debe mover
  if (colorFichas == "blancas") {
    console.log("mueven las blancas");

    if (
      filaAnterior < 8 &&
      filaNueva == filaAnterior + 1 &&
      Math.abs(columnaAnterior - columnaNueva) == 1
    ) {
      return true;
    } else if (
      filaAnterior < 7 &&
      filaNueva == filaAnterior + 2 &&
      Math.abs(columnaAnterior - columnaNueva) == 2
    ) {
      var posicionPosibleFicha =
        filaAnterior +
        1 +
        "-" +
        (columnaAnterior + (columnaNueva - columnaAnterior) / 2);
      console.log(posicionPosibleFicha);

      //Identificar casilla intermedia
      var casillaVerificar = document.getElementById(posicionPosibleFicha);

      //Casilla intermedia hay una ficha negra, se mueve la ficha blanca
      if (casillaVerificar.classList.contains("ficha-negra")) {
        casillaVerificar.classList.remove("ficha-negra");
        document.getElementById("puntos2").value -= 1;
        return true;
      }
    }
  } else if (colorFichas == "negras") {
    console.log("mueven las negras");

    if (
      filaAnterior > 0 &&
      filaNueva == filaAnterior - 1 &&
      Math.abs(columnaAnterior - columnaNueva) == 1
    ) {
      //La casilla, si esta en la columna 1 o la 8, solo tendra posible una casilla de avance
      if (columnaAnterior > 1) {
        console.log(
          "Mueve desde la columna mayor a 1, hay celda libre avance columna anterior"
        );
      } else if (columnaAnterior < 8) {
        console.log(
          "Mueve desde la columna menor a 8, hay celda libre avance columna siguiente"
        );
      }
      return true;
    } else if (
      filaAnterior > 1 &&
      filaNueva == filaAnterior - 2 &&
      Math.abs(columnaAnterior - columnaNueva) == 2
    ) {
      var posicionPosibleFicha =
        filaAnterior -
        1 +
        "-" +
        (columnaAnterior + (columnaNueva - columnaAnterior) / 2);
      console.log(posicionPosibleFicha);
      var casillaVerificar = document.getElementById(posicionPosibleFicha);
      if (casillaVerificar.classList.contains("ficha-blanca")) {
        casillaVerificar.classList.remove("ficha-blanca");
        document.getElementById("puntos1").value -= 1;
        return true;
      }
    }
  }

  //Casilla no es valida, no se realiza el movimiento
  return false;
}

//Función para enviar datos a la API del servidor remoto
function enviarDatosServidor(turnoJugador, posicionMarca) {
  var datosEnviar = {
    turnoJugador,
    posicionMarca,
  };
  var servidor = "https://jsonplaceholder.typicode.com/posts";
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(datosEnviar),
  })
    .then((response) => response.json())
    .then((json) =>
      console.log(
        "Datos enviados al servidor: Mueve el jugador: " +
          turnoJugador +
          " a la casilla: " +
          posicionMarca
      )
    )
    .catch((err) => console.log("Error al enviar al servidor: " + err));
}

//Funciòn para enviar datos del formulario de consulta
function enviarDatosContacto() {
  var cNombre = document.getElementById("nombre");
  var cMail = document.getElementById("mail");
  var cConsulta = document.getElementById("consulta");

  console.log("el nombre de coontacto es: " + cNombre.value);
  console.log("el mail de coontacto es: " + cMail.value);
  console.log("la consulta es: " + cConsulta.value);

  var contactoNombre = cNombre.value;
  var contactoMail = cMail.value;
  var contactoConsulta = cConsulta.value;

  var datosEnviar = {
    contactoNombre,
    contactoMail,
    contactoConsulta,
  };
  var servidor = "https://jsonplaceholder.typicode.com/posts";

  //Verifición que el texto de nombre y apellido ingresado tenga al menos 5 caracteres
  if (contactoNombre.length >= 5) {
    //verifico que la direccion de mail tenga una estructura valida
    if (
      contactoMail.indexOf("@") > 0 &&
      contactoMail.length >= 9 &&
      contactoMail.lastIndexOf(".") - contactoMail.indexOf("@") > 3
    ) {
      //verifico que el campo de la consulta no este vacio
      if (contactoConsulta.length >= 5) {
        //ejecuto el envio de datos por medio del programa/herramienta de envío de emails predeterminada del sistema operativo.
        var urlMail =
          "mailto:" +
          contactoMail +
          "?subject=Contacto de " +
          contactoNombre +
          " a traves de la pagina de MINI-DAMAS&body=" +
          contactoConsulta;
        console.log(urlMail);
        location.href = urlMail;
      } else {
        window.alert("Datos incompletos: Escriba la consulta a realizar");
      }
    } else {
      window.alert("Datos incompletos: El correo electronico no es correcto");
    }
  } else {
    window.alert(
      "Datos incompletos: Escriba su Nombre y Apellido, minimo 5 caracteres"
    );
  }
}

//Guardar partida actual  SESSIONSTORAGE  mantiene sesion activa
function guardarSesionActual() {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var nombreCelda = i + "-" + j;
      var celda = document.getElementById(nombreCelda);
      if (celda.classList.contains("ficha-blanca")) {
        ArrayInicial[i][j] = 1;
      } else if (celda.classList.contains("ficha-negra")) {
        ArrayInicial[i][j] = 2;
      } else {
        ArrayInicial[i][j] = 0;
      }
    }
  }
  console.log(ArrayInicial);

  //Armar array con los datos de la partida actual
  partidaActual = [
    document.getElementById("nombreJugador1").textContent,
    document.getElementById("nombreJugador2").textContent,
    document.getElementById("puntos1").value,
    document.getElementById("puntos2").value,
    ArrayInicial,
    turnoJugador,
    juegoFinalizado,
    mensaje,
  ];

  //Convertir Array a String
  var partidaActualString = JSON.stringify(partidaActual);
  console.log(
    "Array partidaActual convertido a string: " + partidaActualString
  );

  //Guardar datos de la partida en el Local storage
  sessionStorage.setItem("PartidaActual", partidaActualString);
}

//Función que recarga los datos de juego de la sesión actual del juego al refrescar la pagina
function recargarSesionActual() {
  if (cargaInicial == 0) {
    PartidaActual = JSON.parse(sessionStorage.getItem("PartidaActual"));
    console.log(PartidaActual);
    var nomJugador1 = PartidaActual[0];
    var nomJugador2 = PartidaActual[1];
    var puntosJugador1 = PartidaActual[2];
    var puntosJugador2 = PartidaActual[3];
    ArrayInicial = PartidaActual[4];
    turnoJugador = PartidaActual[5];
    juegoFinalizado = PartidaActual[6];
    mensaje = PartidaActual[7];

    //Dibujar el tablero en funcion del array de juego de partida
    dibujarFichas(
      ArrayInicial,
      nomJugador1,
      nomJugador2,
      puntosJugador1,
      puntosJugador2,
      turnoJugador
    );
    cargaInicial = 1;
  } else {
    if (window.confirm("Borrará la partida actual. Desea continuar?")) {
      //Recuperar el array con los datos almacenado en el sessionStorage
      PartidaActual = JSON.parse(sessionStorage.getItem("PartidaActual"));
      console.log(PartidaActual);
      var nomJugador1 = PartidaActual[0];
      var nomJugador2 = PartidaActual[1];
      var puntosJugador1 = PartidaActual[2];
      var puntosJugador2 = PartidaActual[3];
      ArrayInicial = PartidaActual[4];
      turnoJugador = PartidaActual[5];
      juegoFinalizado = PartidaActual[6];
      mensaje = PartidaActual[7];

      //Dibujar el tablero en funcion del array de juego de partida
      dibujarFichas(
        ArrayInicial,
        nomJugador1,
        nomJugador2,
        puntosJugador1,
        puntosJugador2,
        turnoJugador
      );
    }
  }
}

// Funcion guardar partida
function guardarPartida() {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var nombreCelda = i + "-" + j;
      var celda = document.getElementById(nombreCelda);
      if (celda.classList.contains("ficha-blanca")) {
        ArrayInicial[i][j] = 1;
      } else if (celda.classList.contains("ficha-negra")) {
        ArrayInicial[i][j] = 2;
      } else {
        ArrayInicial[i][j] = 0;
      }
    }
  }

  //console.log(ArrayInicial);

  //Array con los datos del juego actual
  partidaGuardada = [
    document.getElementById("nombreJugador1").textContent,
    document.getElementById("nombreJugador2").textContent,
    document.getElementById("puntos1").value,
    document.getElementById("puntos2").value,
    ArrayInicial,
    turnoJugador,
    juegoFinalizado,
    mensaje,
  ];

  var partidaGuardadaString = JSON.stringify(partidaGuardada);
  //console.log('Array partidaActual convertido a string: ' + partidaGuardadaString);
  localStorage.setItem("partidaGuardada", partidaGuardadaString);
}

//Función recuperar datos de una partida
function recuperarPartida() {
  if (cargaInicial == 0) {
    partidaGuardada = JSON.parse(localStorage.getItem("partidaGuardada"));
    //console.log(partidaGuardada);
    var nomJugador1 = partidaGuardada[0];
    var nomJugador2 = partidaGuardada[1];
    var puntosJugador1 = partidaGuardada[2];
    var puntosJugador2 = partidaGuardada[3];
    ArrayInicial = partidaGuardada[4];
    turnoJugador = partidaGuardada[5];
    juegoFinalizado = partidaGuardada[6];
    mensaje = partidaGuardada[7];

    dibujarFichas(
      ArrayInicial,
      nomJugador1,
      nomJugador2,
      puntosJugador1,
      puntosJugador2,
      turnoJugador
    );
    window.alert("La partida se ha cargado correctamente");
    cargaInicial = 1;
  } else {
    if (
      window.confirm(
        "Esta operación borrará la partida actual. Desea continuar?"
      )
    ) {
      partidaGuardada = JSON.parse(localStorage.getItem("partidaGuardada"));
      console.log(partidaGuardada);
      var nomJugador1 = partidaGuardada[0];
      var nomJugador2 = partidaGuardada[1];
      var puntosJugador1 = partidaGuardada[2];
      var puntosJugador2 = partidaGuardada[3];
      ArrayInicial = partidaGuardada[4];
      turnoJugador = partidaGuardada[5];
      juegoFinalizado = partidaGuardada[6];
      mensaje = partidaGuardada[7];

      dibujarFichas(
        ArrayInicial,
        nomJugador1,
        nomJugador2,
        puntosJugador1,
        puntosJugador2,
        turnoJugador
      );
      window.alert("La partida se ha cargado correctamente");
    }
  }
}
