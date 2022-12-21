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
