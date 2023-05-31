const formDatosPersProf = document.getElementById('formDatosPersProf');
const inputs = document.querySelectorAll('#formDatosPersProf input');
const inputDni = document.getElementById('dni');
const inputProfesion = document.getElementById('profesion');
const inputMatricula = document.getElementById('matricula');  
const inputDomicilio = document.getElementById('domicilio');  
const inputFecNacimiento = document.getElementById('nacimiento');  
const selects = document.querySelectorAll('#formDatosPersProf select');
const terminos = document.getElementById('terminos');


const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    dni: /^\d{8,8}$/, // 8 numeros.
    profesion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    matricula: /^\d{4,6}$/, // 4 a 6 numeros.
    domicilio: /^[a-zA-ZÀ-ÿ\s\_\-]{1,40}$/, // Letras y espacios, guion y guion_bajo, pueden llevar acentos.
    codPostal: /^[a-zA-Z0-9]{4,8}$/, // Letras, numeros
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    dni: false,
    profesion: false,
    matricula: false,
    domicilio: false,
    fechanacimiento: false,
    select: false,
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
        case 'terminos':
            validarTerminos();
        break;
        case 'select':
        validarSelect();
        break;

        case "fechanacimiento":
            validarFechaNacimiento();
            break;
     
    }
}
selects.forEach((select) => {
    select.addEventListener('change', (e) => {
      validarSelect(e.target, select.id);
    });
  });

  function validarSelect(e) {
    const select = e.target;
    const campo = select.id;
  
    if (select.value !== '') {
      document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
      document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
      campos[campo] = true;
    } else {
      document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
      document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
      campos[campo] = false;
    }
  }


  const validarFechaNacimiento = () => {
    const inputFechaNacimiento = document.getElementById('fechanacimiento');
    const fechaNacimiento = new Date(inputFechaNacimiento.value);
    const fechaActual = new Date();
    const edadMinima = 16;
  
    if (
      expresiones.fechanacimiento.test(inputFechaNacimiento.value) &&
      fechaNacimiento <= fechaActual &&
      calcularEdad(fechaNacimiento) >= edadMinima
    ) {
      document.getElementById('grupo__fecha-nacimiento').classList.remove('formulario__grupo-incorrecto');
      document.getElementById('grupo__fecha-nacimiento').classList.add('formulario__grupo-correcto');
      document.querySelector('#grupo__fecha-nacimiento i').classList.add('fa-check-circle');
      document.querySelector('#grupo__fecha-nacimiento i').classList.remove('fa-times-circle');
      document.querySelector('#grupo__fecha-nacimiento .formulario__input-error').classList.remove('formulario__input-error-activo');
      campos.fechanacimiento = true;
    } else {
      document.getElementById('grupo__fecha-nacimiento').classList.add('formulario__grupo-incorrecto');
      document.getElementById('grupo__fecha-nacimiento').classList.remove('formulario__grupo-correcto');
      document.querySelector('#grupo__fecha-nacimiento i').classList.add('fa-times-circle');
      document.querySelector('#grupo__fecha-nacimiento i').classList.remove('fa-check-circle');
      document.querySelector('#grupo__fecha-nacimiento .formulario__input-error').classList.add('formulario__input-error-activo');
      campos.fechanacimiento = false;
  
    }
  }
  
  const calcularEdad = (fechaNacimiento) => {
    const diff = Date.now() - fechaNacimiento.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  // Agregar evento a input de fecha de nacimiento
  const inputFechaNacimiento = document.getElementById('fechanacimiento');
  inputFechaNacimiento.addEventListener('keyup', validarFechaNacimiento);
  inputFechaNacimiento.addEventListener('blur', validarFechaNacimiento);
  


/* selectElement.addEventListener('change', validarSelect);
function validarSelect() {
  if (selectElement.value !== '') {
    document.getElementById(`grupo_${selectElement.id}`).classList.remove('formulario_grupo-incorrecto');
    document.getElementById(`grupo_${selectElement.id}`).classList.add('formulario_grupo-correcto');
    campos.select = true;
  } else {
    document.getElementById(`grupo_${selectElement.id}`).classList.add('formulario_grupo-incorrecto');
    document.getElementById(`grupo_${selectElement.id}`).classList.remove('formulario_grupo-correcto');
    campos.select = false;
  }
} */

  // Agrega el evento 'change' a los select
/* selects.forEach((select) => {
    select.addEventListener('change', (e) => {
      validarSelect(e.target, select.id);
    });
  });  */
 

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

const validarTerminos = () => {
    if (terminos.checked) {
      document.getElementById('grupo__terminos').classList.remove('formulario__grupo-incorrecto');
      document.getElementById('grupo__terminos').classList.add('formulario__grupo-correcto');
      document.querySelector('#grupo__terminos .formulario__input-error').classList.remove('formulario__input-error-activo');
      campos.terminos = true;
    } else {
      document.getElementById('grupo__terminos').classList.add('formulario__grupo-incorrecto');
      document.getElementById('grupo__terminos').classList.remove('formulario__grupo-correcto');
      document.querySelector('#grupo__terminos .formulario__input-error').classList.add('formulario__input-error-activo');
      campos.terminos = false;
    }
  };


inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario );
    input.addEventListener('blur', validarFormulario );
})

formDatosPersProf.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');

  
    if(campos.nombre && campos.apellido && campos.dni && campos.correo && campos.password && terminos.checked){
        formulario.reset();

       document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 4000); 

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        })
    } else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
  
});