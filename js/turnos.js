document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formSolTurno');
  const inputs = document.querySelectorAll('#formSolTurno input');
  const selects = document.querySelectorAll('#formSolTurno select');
  const especialidad = document.getElementById('especialidad');
  const profesional = document.getElementById('profesional');
  const fechaTurno = document.getElementById('input-fecha');
  const horaTurno = document.getElementById('horaTurno');
  const obraSocial = document.getElementById('obrasocial');
  const motivoConsulta = document.getElementById('motivo');

  const expresiones = {
    fechaTurno: /^\d{4}-\d{2}-\d{2}$/, // Formato YYYY-MM-DD
    obrasocial: /^[a-zA-ZÀ-ÿ]{1,10}$/, // Letras, pueden llevar acentos.
    motivo: /^[a-zA-ZÀ-ÿ0-9\s]{5,255}$/, // Letras, números y espacios, pueden llevar acentos.
  };

  const campos = {
    fechaTurno: false,
    obrasocial: false,
    motivo: false,
    especialidad: false,
    profesional: false,
    horaTurno: false,
  };

  const opcionesEspecialidad = [
    { value: 'clinica', text: 'Clínica' },
    { value: 'traumatologia', text: 'Traumatología' },
    { value: 'cardiologia', text: 'Cardiología' },
  ];

  const opcionesProfesional = [
    { value: 'mario', text: 'Dr Perez Mario' },
    { value: 'victor', text: 'Dr Sosa Victor' },
    { value: 'luis', text: 'Dr Gomez Luis' },
  ];

  const opcionesHoraTurno = [
    { value: '9am', text: '9:00 AM' },
    { value: '10am', text: '10:00 AM' },
    { value: '11am', text: '11:00 AM' },
    { value: '12pm', text: '12:00 PM' },
    { value: '1pm', text: '1:00 PM' },
  ];

  // Generar opciones para el select de especialidad
  opcionesEspecialidad.forEach((opcion) => {
    const option = document.createElement('option');
    option.value = opcion.value;
    option.text = opcion.text;
    especialidad.appendChild(option);
  });

  // Generar opciones para el select de profesional
  opcionesProfesional.forEach((opcion) => {
    const option = document.createElement('option');
    option.value = opcion.value;
    option.text = opcion.text;
    profesional.appendChild(option);
  });

  // Generar opciones para el select de hora de turno
  opcionesHoraTurno.forEach((opcion) => {
    const option = document.createElement('option');
    option.value = opcion.value;
    option.text = opcion.text;
    horaTurno.appendChild(option);
  });

  const validarFormulario = (e) => {
    switch (e.target.id) {
      case 'input-fecha':
        validarFechaTurno();
        break;
      case 'obrasocial':
        validarCampo(expresiones.obrasocial, e.target, 'obrasocial');
        break;
      case 'motivo':
        validarCampo(expresiones.motivo, e.target, 'motivo');
        break;
      case 'especialidad':
        validarSelect(e.target, 'especialidad');
        break;
      case 'profesional':
        validarSelect(e.target, 'profesional');
        break;
      case 'horaTurno':
        validarSelect(e.target, 'horaTurno');
        break;
    }
  };
  
  const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
      document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
      campos[campo] = true;
    } else {
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
      document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
      campos[campo] = false;
    }
  };
  

  const expresionValidacion = expresiones.motivo;
  const textareaInput = document.getElementById('motivo'); 
  const campoValidacion = 'motivo'; 

textareaInput.addEventListener('input', () => {
  validarCampo(expresionValidacion, textareaInput, campoValidacion);
});
  
const validarSelect = (select, campo) => {
  if (select.value !== '') {
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    campos[campo] = false;
  }
};



  const validarFechaTurno = () => {
    const inputFechaTurno = document.getElementById('input-fecha');
    const fechaTurno = new Date(inputFechaTurno.value);
    const fechaActual = new Date();
    const maximoDias = 14; // Máximo de días permitidos (2 semanas)

    // Crear una copia de la fecha actual
    const fechaLimite = new Date(fechaActual);
    fechaLimite.setDate(fechaLimite.getDate() + maximoDias);

    if (
      expresiones.fechaTurno.test(inputFechaTurno.value) &&
      fechaTurno <= fechaLimite
    ) {
      document.getElementById('grupo__fecha').classList.remove('formulario__grupo-incorrecto');
      document.getElementById('grupo__fecha').classList.add('formulario__grupo-correcto');
      document.querySelector('#grupo__fecha i').classList.add('fa-check-circle');
      document.querySelector('#grupo__fecha i').classList.remove('fa-times-circle');
      document.querySelector('#grupo__fecha .formulario__input-error').classList.remove('formulario__input-error-activo');
      campos.fechaTurno = true;
    } else {
      document.getElementById('grupo__fecha').classList.add('formulario__grupo-incorrecto');
      document.getElementById('grupo__fecha').classList.remove('formulario__grupo-correcto');
      document.querySelector('#grupo__fecha i').classList.add('fa-times-circle');
      document.querySelector('#grupo__fecha i').classList.remove('fa-check-circle');
      document.querySelector('#grupo__fecha .formulario__input-error').classList.add('formulario__input-error-activo');
      campos.fechaTurno = false;
    }
  };

// Agrega el evento 'change' a los select
selects.forEach((select) => {
  select.addEventListener('change', (e) => {
    validarSelect(e.target, select.id);
  });
});


  // Agregar evento a input de fecha de turno
  const inputFechaTurno = document.getElementById('input-fecha');
  inputFechaTurno.addEventListener('keyup', validarFechaTurno);
  inputFechaTurno.addEventListener('blur', validarFechaTurno);

  inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });


  
  // Obtiene los pacientes existentes del localstorage o crea un nuevo array vacío
  let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
  



  formulario.addEventListener('click', (e) => {
    e.preventDefault();
    const fecha = fechaTurno.value;
    const obrasocial = obraSocial.value;
    const motivoConsulta = motivo.value;
    const especialidadProf = especialidad.value;
    const profesionalElegido = profesional.value;
    const turnoElegido = horaTurno.value;

    console.log(campos.fechaTurno);
    console.log(campos.obrasocial);
    console.log(campos.motivo);
    console.log(campos.especialidad);
    console.log(campos.profesional);
    console.log(campos.horaTurno);

     // Verificar si el turno ya existe
     const turnoExistente = turnos.find(turno => turno.fechaTurno === fechaTurno && turno.horaTurno === horaTurno);

    if (
      campos.fechaTurno &&
      campos.obrasocial &&
      campos.motivo &&
      campos.especialidad &&
      campos.profesional &&
      campos.horaTurno
    ) {
      formulario.reset();
      if(!turnoExistente){
        const turno = {
          fechaTurno: fecha,
          obrasocial: obrasocial,
          motivo: motivoConsulta,
          especialidad: especialidadProf,
          profesional: profesionalElegido,
          turno: turnoElegido

        }


        turnos.push(turno);

        // Guardar la lista de pacientes actualizada en el almacenamiento local
        localStorage.setItem('turnos', JSON.stringify(turnos));

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
          document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 4000);
  
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
          icono.classList.remove('formulario__grupo-correcto');
        });
      }else{
          document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
      }
    } else {
      document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
  });



// Paso 1: Obtén la referencia al botón "Actualizar"
const btnActualizar = document.querySelector('#btnAct');

// Paso 2: Agrega un evento click al botón "Actualizar"
btnActualizar.addEventListener('submit', actualizarTabla);

// Paso 3: Crea la función `actualizarTabla`
function actualizarTabla(event) {
  event.preventDefault();

  // Obtén los datos actualizados del formulario
  const fecha = fechaTurno.value;
  const obrasocial = obraSocial.value;
  const motivoConsulta = motivo.value;
  const especialidadProf = especialidad.value;
  const profesionalElegido = profesional.value;
  const turnoElegido = horaTurno.value;

  // Obtén los turnos del localStorage
  let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

  // Encuentra el turno a actualizar en la lista de turnos
  const turnoActualizado = turnos.find(turno => turno.fechaTurno === fecha && turno.turno === turnoElegido);

  if (turnoActualizado) {
    // Actualiza los datos del turno
    turnoActualizado.obrasocial = obrasocial;
    turnoActualizado.motivo = motivoConsulta;
    turnoActualizado.especialidad = especialidadProf;
    turnoActualizado.profesional = profesionalElegido;

    // Actualiza los datos en el localStorage
    localStorage.setItem('turnos', JSON.stringify(turnos));

    // Llama a una función para actualizar la tabla en el DOM
    actualizarTablaDOM();

    // Muestra un mensaje de éxito
    mostrarMensajeExito('Tabla actualizada correctamente.');
  } else {
    // Muestra un mensaje de error si no se encuentra el turno a actualizar
    mostrarMensajeError('No se encontró el turno a actualizar.');
  }
}



// Paso 4: Crea la función `actualizarTablaDOM`
function actualizarTablaDOM() {
  // Obtén la referencia a la tabla en el DOM
  const tabla = document.getElementById('tablaTurnos');

  // Obtén los turnos del localStorage
  let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

  // Vacía la tabla
  tabla.innerHTML = '';

  // Recorre la lista de turnos y crea las filas de la tabla con los datos actualizados
  turnos.forEach((turno) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${turno.fechaTurno}</td>
      <td>${turno.obrasocial}</td>
      <td>${turno.motivo}</td>
      <td>${turno.especialidad}</td>
      <td>${turno.profesional}</td>
      <td>${turno.turno}</td>
    `;
    tabla.appendChild(fila);
  });
}

// Paso 5: Crea las funciones `mostrarMensajeExito` y `mostrarMensajeError`
function mostrarMensajeExito(mensaje) {
  const mensajeExito = document.getElementById('formulario__mensaje-exito');
  mensajeExito.textContent = mensaje;
  mensajeExito.classList.add('formulario__mensaje-exito-activo');
  setTimeout(() => {
    mensajeExito.classList.remove('formulario__mensaje-exito-activo');
  }, 3000);
}

function mostrarMensajeError(mensaje) {
  const mensajeError = document.getElementById('formulario__mensaje');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('formulario__mensaje-error-activo');
  setTimeout(() => {
    mensajeError.classList.remove('formulario__mensaje-error-activo');
  }, 3000);
}

  



});
