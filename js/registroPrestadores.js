document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const inputs = document.querySelectorAll('#formulario input');
  const inputUsuario = document.getElementById('usuario1');
  const inputNombre = document.getElementById('nombre');
  const inputApellido = document.getElementById('apellido');
  const inputCorreo = document.getElementById('correo');
  const inputContraseña = document.getElementById('password');
  const inputRepContraseña = document.getElementById('password2');
  const terminos = document.getElementById('terminos');

  const expresiones = {
    usuario1: /^[a-zA-Z0-9\_\-]{6,16}$/, // Letras, números, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,18}$/, // 6 a 18 dígitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 números.
  };

  const campos = {
    usuario1: false,
    nombre: false,
    apellido: false,
    correo: false,
    password: false
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case 'usuario1':
        validarCampo(expresiones.usuario1, e.target, 'usuario1');
        break;
      case 'nombre':
        validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
      case 'apellido':
        validarCampo(expresiones.nombre, e.target, 'apellido');
        break;
      case 'correo':
        validarCampo(expresiones.correo, e.target, 'correo');
        break;
      case 'password':
        validarCampo(expresiones.password, e.target, 'password');
        break;
      case 'password2':
        validarPassword2();
        break;
      case 'terminos':
        validarTerminos();
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

  const validarPassword2 = () => {
    if (inputContraseña.value !== inputRepContraseña.value) {
      document.getElementById('grupo__password2').classList.add('formulario__grupo-incorrecto');
      document.getElementById('grupo__password2').classList.remove('formulario__grupo-correcto');
      document.querySelector('#grupo__password2 i').classList.add('fa-times-circle');
      document.querySelector('#grupo__password2 i').classList.remove('fa-check-circle');
      document.querySelector('#grupo__password2 .formulario__input-error').classList.add('formulario__input-error-activo');
      campos['password'] = false;
    } else {
      document.getElementById('grupo__password2').classList.remove('formulario__grupo-incorrecto');
      document.getElementById('grupo__password2').classList.add('formulario__grupo-correcto');
      document.querySelector('#grupo__password2 i').classList.remove('fa-times-circle');
      document.querySelector('#grupo__password2 i').classList.add('fa-check-circle');
      document.querySelector('#grupo__password2 .formulario__input-error').classList.remove('formulario__input-error-activo');
      campos['password'] = true;
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
  
    
// Obtiene los prestadores existentes del localstorage o crea un nuevo array vacío
let prestadores = JSON.parse(localStorage.getItem('prestadores')) || [];

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const terminosyCond = document.getElementById('terminos');
  const usuario1 = inputUsuario.value;
  const nombre = inputNombre.value;
  const apellido = inputApellido.value;
  const correo = inputCorreo.value;
  const contraseña = inputContraseña.value;
  const contraseña2 = inputRepContraseña.value;

  // Verificar si el usuario ya existe
  const prestadorExistente = prestadores.find(prestador => prestador.usuario1 === usuario1);
  const mailExistente = prestadores.find(prestador => prestador.correo === correo);

  if (campos.usuario1 && campos.nombre && campos.apellido && campos.correo && campos.password && terminosyCond.checked) {
    if (!prestadorExistente && !mailExistente) {
      formulario.reset();

      const prestador = {
        usuario: usuario1,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contraseña: contraseña,
        contraseña2: contraseña2,
        rol: 'prestador'
      };

      prestadores.push(prestador);

      // Guardar la lista de prestadores actualizada en el almacenamiento local
      localStorage.setItem('prestadores', JSON.stringify(prestadores));

      document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
      setTimeout(() => {
        document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
      }, 5000);

      document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
        icono.classList.remove('formulario__grupo-correcto');
      });
    } else {
      // Mostrar mensaje de error si el usuario o correo electrónico ya existen
      document.getElementById('formulario__mensaje').textContent = 'El usuario o correo ya existen';
    }
  } else {
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
  }
});

  inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });

});  


