// Paso 1: Obtener los datos del usuario logueado almacenados en el LocalStorage
var usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

// Paso 2: Crear una función para agregar elementos a la tabla HTML según el usuario logueado
function agregarElementosTablaUsuarioLogueado() {
  // Obtener la referencia del elemento tbody de la tabla
  var tbody = document.querySelector('.table tbody');

  // Definir los campos deseados del objeto usuarioLogueado con sus correspondientes nombres para mostrar
  var camposDeseados = {
    usuario: 'Usuario',
    nombre: 'Nombre',
    apellido: 'Apellido',
    correo: 'Correo',
    dni: 'DNI',
    fecNacimiento: 'Fecha de Nacimiento'
  };

  // Recorrer los campos deseados y agregar filas a la tabla
  for (var campo in camposDeseados) {
    var valor = usuarioLogueado[campo];

    var fila = document.createElement('tr');

    // Crear la celda de la etiqueta de propiedad (ejemplo: "Nombre")
    var celdaEtiqueta = document.createElement('td');
    celdaEtiqueta.innerHTML = '<div class="d-flex align-items-center"><div class="ms-3"><p class="fw-bold mb-1">' + camposDeseados[campo] + '</p></div></div>';
    fila.appendChild(celdaEtiqueta);

    // Crear la celda de valor de la propiedad (ejemplo: "Mariano")
    var celdaValor = document.createElement('td');
    celdaValor.innerHTML = '<p class="fw-normal mb-1">' + valor + '</p>';
    fila.appendChild(celdaValor);

    // Agregar la fila a la tabla
    tbody.appendChild(fila);
  }
}

// Llamar a la función para agregar elementos a la tabla del usuario logueado
agregarElementosTablaUsuarioLogueado();
