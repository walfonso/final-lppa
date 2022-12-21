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

  //Verificar el color de ficha y cual debe mover
  if (colorFichas == "blancas") {
    console.log("mueven las blancas");
    //Ver si se esta moviendo en diagonal 1 o 2 lugares
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

      var casillaVerificar = document.getElementById(posicionPosibleFicha);

      if (casillaVerificar.classList.contains("ficha-negra")) {
        casillaVerificar.classList.remove("ficha-negra");
        document.getElementById("puntos2").value -= 1;
        return true;
      }
    }
  }
}
//

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
