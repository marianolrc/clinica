// Función para obtener los datos del almacenamiento local
function getLocalStorageData() {
  // Obtener los datos del local storage
  const data = localStorage.getItem("turnos");

  // Verificar si hay datos almacenados
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

// Función para mostrar información en la tabla
function showData() {
  const data = getLocalStorageData();

  let html = "";

  // Crear el encabezado de la tabla
  html += "<thead>";
  html += "<tr>";
  html += "<th>Especialidad</th>";
  html += "<th>Profesional</th>";
  html += "<th>Fecha</th>";
  html += "<th>Turno</th>";
  html += "<th>Obra Social</th>";
  html += "<th>Acciones</th>";
  html += "</tr>";
  html += "</thead>";

  // Crear las filas de la tabla con los datos
  html += "<tbody>";
  data.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + getEspecialidad(element.especialidad) + "</td>";
    html += "<td>" + getProfesionalLabel(element.profesional) + "</td>";
    html += "<td>" + element.fechaTurno + "</td>";
    html += "<td>" + getTurnosLabel(element.turno) + "</td>";
    html += "<td>" + element.obrasocial + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-primary">Eliminar</button>' +
      '<button onclick="editData(' +
      index +
      ')" class="btn btn-dark m-2">Editar</button></td>';
    html += "</tr>";
  });
  html += "</tbody>";

  document.querySelector("#tablaTurnos").innerHTML = html;
}



function getTurnosLabel(value){
  switch (value){
    case "9am":
      return "9:00 AM";
    case "10am":
      return "10:00 AM";
    case "11am":
      return "11:00 AM";
    case "12am":
      return "12:00 AM";
    case "1pm":
      return "1:00 PM";
  }
}

function getProfesionalLabel(value) {
  switch (value) {
    case "mario":
      return "Perez Mario";
    case "victor":
      return "Sosa Victor";
    case "luis":
      return "Gomez Luis";
  }
}
function getEspecialidad(value) {
  switch (value) {
    case "clinica":
      return "Clínica";
    case "traumatologia":
      return "Traumatología";
    case "cardiologia":
      return "Cardiología";
  }
}

// Función para eliminar información del almacenamiento local
function deleteData(index) {
  let data = getLocalStorageData();
  data.splice(index, 1);
  localStorage.setItem("turnos", JSON.stringify(data));
  showData();
}


// Función para editar información
function editData(index) {
  // Obtener los datos del LocalStorage
  const data = getLocalStorageData();

  // Obtener el turno a editar
  const turno = data[index];

  // Redirigir al formulario
  const formularioTab = document.getElementById("turno-tab");
  formularioTab.click();

  // Esperar un poco antes de asignar los valores al formulario
  setTimeout(() => {

    const fechaTurno = document.getElementById("input-fecha");
    const obraSocial = document.getElementById("obrasocial");
    const motivo = document.getElementById("motivo");
    const especialidad = document.getElementById("especialidad");
    const profesional = document.getElementById("profesional");
    const horaTurno = document.getElementById("horaTurno");

    // Asignar los valores del turno a los campos del formulario
    if (turno.fechaTurno) {
      fechaTurno.value = turno.fechaTurno;
    }
    obraSocial.value = turno.obrasocial;
    motivo.value = turno.motivo;
    especialidad.value = turno.especialidad;
    profesional.value = turno.profesional;
    horaTurno.value = turno.hora;
  }, 500);
}


// Cargar la información del almacenamiento local cuando el documento o la página carga
document.addEventListener("DOMContentLoaded", function() {
  showData();
});
