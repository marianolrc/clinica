const formDatosPersProf = document.getElementById('formDatosPersProf');
const inputs = document.querySelectorAll('#formDatosPersProf input');
const inputDni = document.getElementById('dni');
const inputProfesion = document.getElementById('profesion');
const inputMatricula = document.getElementById('matricula');  
const selectEspecialidad = document.getElementById('especialidad');  
const dateFecNacimiento = document.getElementById('nacimiento');  
const selects = document.querySelectorAll('#formDatosPersProf select');



const expresiones = {
    dni: /^\d{8,8}$/, // 8 numeros.
    profesion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    matricula: /^\d{4,6}$/, // 4 a 6 numeros.
    nacimiento: /^\d{4}-\d{2}-\d{2}$/, // Formato YYYY-MM-DD
}

const campos = {
    dni: false,
    profesion: false,
    matricula: false,
    nacimiento: false,
    especialidad: false,
}

const validarFormulario = (e)=>{
    switch (e.target.name) {
        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
        break;
        case "profesion":
            validarCampo(expresiones.profesion, e.target, 'profesion');
        break;
        case "matricula":
            validarCampo(expresiones.matricula, e.target, 'matricula');
        break;
        case 'especialidad':
          validarSelect(e.target, 'especialidad');
        break;
        case "nacimiento":
            validarFechaNacimiento();
            break;
     
    }
}

// Agrega el evento 'change' a los select
selects.forEach((select) => {
  select.addEventListener('change', (e) => {
    validarSelect(e.target, select.id);
  });
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



const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto'); 
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle'); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};



inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario );
    input.addEventListener('blur', validarFormulario );
});

  
const validarFechaNacimiento = () => {
  const dateFecNacimiento = document.getElementById('nacimiento');
  const fechaNacimiento = new Date(dateFecNacimiento.value);
  const fechaActual = new Date();
  const edadMinima = 18;

  if (
    expresiones.nacimiento.test(dateFecNacimiento.value) &&
    fechaNacimiento <= fechaActual &&
    calcularEdad(fechaNacimiento) >= edadMinima
  ) {
    document.getElementById('grupo__nacimiento').classList.remove('formulario__grupo-incorrecto');
    document.getElementById('grupo__nacimiento').classList.add('formulario__grupo-correcto');
    document.querySelector('#grupo__nacimiento i').classList.add('fa-check-circle');
    document.querySelector('#grupo__nacimiento i').classList.remove('fa-times-circle');
    document.querySelector('#grupo__nacimiento .formulario__input-error').classList.remove('formulario__input-error-activo');
    campos.nacimiento = true;
  } else {
    document.getElementById('grupo__nacimiento').classList.add('formulario__grupo-incorrecto');
    document.getElementById('grupo__nacimiento').classList.remove('formulario__grupo-correcto');
    document.querySelector('#grupo__nacimiento i').classList.add('fa-times-circle');
    document.querySelector('#grupo__nacimiento i').classList.remove('fa-check-circle');
    document.querySelector('#grupo__nacimiento .formulario__input-error').classList.add('formulario__input-error-activo');
    campos.nacimiento = false;

  }
}

const calcularEdad = (nacimiento) => {
  const diff = Date.now() - nacimiento.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Agregar evento a input de fecha de nacimiento
dateFecNacimiento.addEventListener('keyup', validarFechaNacimiento);
dateFecNacimiento.addEventListener('blur', validarFechaNacimiento);

// Obtiene los prestadores existentes del localstorage o crea un nuevo array vacío
let prestadorLogueado = JSON.parse(localStorage.getItem('prestadorLogueado')) || [];
let datosPrestador = JSON.parse(localStorage.getItem('datosPrestador')) || [];


formDatosPersProf.addEventListener('submit', (e) => {
    e.preventDefault();

  const DNI = inputDni.value;
  const profesionElegida = inputProfesion.value;
  const numeroMatricula = inputMatricula.value;
  const fecNacimiento = dateFecNacimiento.value;
  const especialidadElegida = selectEspecialidad.value;

  const datosExistentes = datosPrestador.find(dato => dato.numeroMatricula === numeroMatricula);
    if(campos.dni && campos.profesion && campos.matricula && campos.nacimiento && campos.especialidad){
      formDatosPersProf.reset();
      if(!datosExistentes){
      const prestadorActualizado = {
        dni: DNI,
        profesion: profesionElegida,
        fecha:fecNacimiento,
        matricula: numeroMatricula,
        especialidad: especialidadElegida,
        usuario: prestadorLogueado.usuario,
        apellido: prestadorLogueado.apellido,
        nombre: prestadorLogueado.nombre,
        correo: prestadorLogueado.correo,
        contraseña: prestadorLogueado.contraseña,
        rol: prestadorLogueado.rol
      }  
        datosPrestador.push(prestadorActualizado);
      // Guardar la lista de prestadores actualizada en el almacenamiento local
      localStorage.setItem('datosPrestador', JSON.stringify(datosPrestador));
        
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
         setTimeout(() => {
             document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
         }, 4000); 
 
         document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
             icono.classList.remove('formulario__grupo-correcto');
         })
      }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
    } else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
  
});