document.addEventListener('DOMContentLoaded', () => {
  // Aquí va tu código JavaScript

  const formulario = document.getElementById('formulario');
  const inputs = document.querySelectorAll('#formulario input');
  const nombreUsuario = document.getElementById('usuario1');
  const direccionEmail = document.getElementById('correo');
  const campoPassword = document.getElementById('password');
  const campoRePassword = document.getElementById('password2');
  const campoApellido = document.getElementById('apellido');
  const campoNombre = document.getElementById('nombre');
  const campoFecNacimiento = document.getElementById('fechanacimiento');
  const campoDni = document.getElementById('dni');
  const terminosCond = document.getElementById('terminos');
  
  
  const expresiones = {
    usuario1: /^[a-zA-Z0-9_-]{6,16}$/, // Letras, números, guion y guion bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 6 a 12 dígitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    fechanacimiento: /^\d{4}-\d{2}-\d{2}$/, // Formato YYYY-MM-DD
    dni: /^\d{8}$/ // 8 dígitos numéricos
  }
  
  const campos = {
    usuario1: false,
    correo: false,
    password: false,
    apellido: false,
    nombre: false,
    fechanacimiento: false,
    dni: false
  }
  
  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "usuario1":
        validarCampo(expresiones.usuario1, e.target, 'usuario1');
        break;
      case "correo":
        validarCampo(expresiones.correo, e.target, 'correo');
        break;
      case "password":
        validarCampo(expresiones.password, e.target, 'password');
        break;
      case "nombre":
        validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
      case "apellido":
        validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
      case "fechanacimiento":
        validarFechaNacimiento();
        break;
      case "dni":
        validarCampo(expresiones.dni, e.target, 'dni');
        break;
      case "password2":
        validarPassword2();
        break;
      case "terminos":
        validarTerminos();
        break;
    }
  }
  
  
  const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
       // Caso de éxito: el valor cumple con la expresión regular y es válido
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
      document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
      campos[campo] = true;
    } else {
      // Caso de fallo: el valor no cumple con la expresión regular y es inválido
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
      document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
      campos[campo] = false;
  
    }
  }
  
  const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
  
    if (inputPassword1.value !== inputPassword2.value) {
      document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
      document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
      document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
      campos['password'] = false;
    } else {
      document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
      document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
      document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
      document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
      document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
      campos['password'] = true;
  
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
  
  
  inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });
  
  const validarTerminos = () => {
    const terminos = document.getElementById('terminos');
  
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
  }
  
  
  

  
  
  
  
  // Obtiene los pacientes existentes del localstorage o crea un nuevo array vacío
  let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
  
    // Obteniene los valores de los campos
    const usuario1 = nombreUsuario.value;
    const correo = direccionEmail.value;
    const password = campoPassword.value;
    const password2 = campoRePassword.value;
    const apellido = campoApellido.value;
    const nombre = campoNombre.value;
    const fechanacimiento = campoFecNacimiento.value;
    const dni = campoDni.value;
  
    // Verificar si el usuario ya existe
    const pacienteExistente = pacientes.find(paciente => paciente.usuario === usuario1);
    const mailExistente = pacientes.find(paciente => paciente.correo === correo);
  
    if (campos.usuario1 && campos.nombre && campos.apellido && campos.correo && campos.password && terminos.checked) {
      formulario.reset();
      document.getElementById('formulario__mensaje2').classList.remove('formulario__mensaje-activo');
      document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
      if (!pacienteExistente && !mailExistente) {
  
        // Crea un objeto con los datos del paciente
        const paciente = {
          usuario: usuario1,
          correo: correo,
          password: password,
          password2: password2,
          apellido: apellido,
          nombre: nombre,
          fecNacimiento: fechanacimiento,
          dni: dni,
          rol: 'paciente',
        };
  
        // Agregar el nuevo paciente a la lista
        pacientes.push(paciente);
        // Guardar la lista de pacientes actualizada en el almacenamiento local
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
  
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
          document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 4000);
  
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
          icono.classList.remove('formulario__grupo-correcto');
        });
      } else {
        document.getElementById('formulario__mensaje2').classList.add('formulario__mensaje-activo');
      }
    } else{
      document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
  });
  
});
