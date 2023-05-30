// Tabla de turnos solicitados

let table = document.getElementById("tablaTurnos");
let tbody = document.getElementById("tableBody");

let data = JSON.parse(localStorage.getItem("turnosAsignados")) || [];

cargarDatos();

// Función para agregar una fila a la tabla
function agregarFila() {
  // Obtener los valores de los campos de entrada
  let especialidad = document.getElementById("input-especialidad").options[document.getElementById("input-especialidad").selectedIndex].text;
  let profesional = document.getElementById("input-profesional").options[document.getElementById("input-profesional").selectedIndex].text;
  let fecha = document.getElementById("input-fecha").value;
  let turno = document.getElementById("input-turno").value;

  // Crear un nuevo objeto con los datos
  let rowData = { especialidad: especialidad, profesional: profesional, fecha: fecha, turno: turno };

  // Agregar el objeto a la matriz de datos
  data.push(rowData);

  // Guardar los datos en el almacenamiento local
  localStorage.setItem("tablaData", JSON.stringify(data));

  // Cargar los datos en la tabla nuevamente
  cargarDatos();

  // Restablecer los valores de los campos de entrada
  document.getElementById("input-especialidad").value = "";
  document.getElementById("input-profesional").value = "";
  document.getElementById("input-fecha").value = "";
  document.getElementById("input-turno").value = "";
}

// Función para cargar los datos en la tabla
function cargarDatos() {
  // Limpiar el cuerpo de la tabla
  tbody.innerHTML = "";

  // Recorrer los datos y crear filas para cada objeto
  data.forEach(function (rowData, index) {
    let row = document.createElement("tr");
    let especialidadCell = document.createElement("td");
    let profesionalCell = document.createElement("td");
    let fechaCell = document.createElement("td");
    let turnoCell = document.createElement("td");
    let accionesCell = document.createElement("td");

    especialidadCell.textContent = rowData.especialidad;
    profesionalCell.textContent = rowData.profesional;
    fechaCell.textContent = rowData.fecha;
    turnoCell.textContent = rowData.turno;

    // Crear los botones de eliminar y editar
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function () {
      let rowIndex = Array.from(table.getElementsByTagName("tr")).indexOf(row);
      eliminarFila(rowIndex);
    });

    let editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", function () {
      let rowIndex = Array.from(table.getElementsByTagName("tr")).indexOf(row);
      editarFila(rowIndex);
    });

    accionesCell.appendChild(deleteButton);
    accionesCell.appendChild(editButton);

    row.appendChild(especialidadCell);
    row.appendChild(profesionalCell);
    row.appendChild(fechaCell);
    row.appendChild(turnoCell);
    row.appendChild(accionesCell);

    tbody.appendChild(row);
  });
}

// Función para eliminar una fila de la tabla
function eliminarFila(index) {
  // Eliminar el objeto de la matriz de datos
  data.splice(index, 1);

  // Guardar los datos actualizados en el almacenamiento local
  localStorage.setItem("turnosAsignados", JSON.stringify(data));

  // Cargar los datos en la tabla nuevamente
  cargarDatos();
}

// Función para editar una fila de la tabla
function editarFila(index) {
  // Obtener los valores de los campos de entrada
  let especialidad = document.getElementById("input-especialidad");
  let profesional = document.getElementById("input-profesional");
  let fecha = document.getElementById("input-fecha");
  let turno = document.getElementById("input-turno");

  // Obtener el objeto de la fila seleccionada
  let selectedRow = data[index];

  // Asignar los valores del objeto a los campos de entrada
  especialidad.value = selectedRow.especialidad;
  profesional.value = selectedRow.profesional;
  fecha.value = selectedRow.fecha;
  turno.value = selectedRow.turno;

  // Eliminar la fila seleccionada
  data.splice(index, 1);

  // Guardar los datos actualizados en el almacenamiento local
  localStorage.setItem("turnosAsignados", JSON.stringify(data));

  // Cargar los datos en la tabla nuevamente
  cargarDatos();
}


// Evento para el botón "Eliminar"
deleteButton.addEventListener("click", function() {
  let rowIndex = Array.from(table.getElementsByTagName("tr")).indexOf(row);
  eliminarFila(rowIndex);
});

// Evento para el botón "Editar"
editButton.addEventListener("click", function() {
  let rowIndex = Array.from(table.getElementsByTagName("tr")).indexOf(row);
  editarFila(rowIndex);
});

