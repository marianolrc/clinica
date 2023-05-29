const formPacientes = document.getElementById('formRegPacientes');
const nombreUsuario = document.getElementById('usuario');
const direccionEmail = document.getElementById('email');
const campoPassword = document.getElementById('contraseña');
const campoRePassword = document.getElementById('re-contraseña');
const campoApellido = document.getElementById('apellido');
const campoNombre = document.getElementById('nombre');
const campoFecNacimiento = document.getElementById('fecha');
const campoDni = document.getElementById('numero');
const terminosCond = document.getElementById('checkTerms');
const parrafo = document.getElementById('warnings');




// Obtiene los pacientes existentes del localstorage o crea un nuevo array vacío
let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];


// Escuchar el evento submit del formulario
formPacientes.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

      // Obteniene los valores de los campos
    const usuario = nombreUsuario.value;
    const email = direccionEmail.value;
    const contraseña = campoPassword.value;
    const confirmarContraseña = campoRePassword.value;
    const apellido = campoApellido.value;
    const nombre = campoNombre.value;
    const fecNacimiento = campoFecNacimiento.value;
    const dni = campoDni.value;

    let warnings = '';
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let regexUser = /^[a-zA-Z0-9]+$/; 
    let regexNombre = /^[a-zA-Z]+$/;

    parrafo.innerHTML = ""
    if(usuario.length < 6 ){
      warnings += 'El usuario debe tener un minimo de 6 caracteres <br>';
      entrar = true;
    }else if(!regexUser.test(usuario)){
      warnings += 'El nombre de usuario solo puede estar formado por letras y numeros <br>';
      entrar = true;
    }
    if(!regexEmail.test(email)){
      warnings += 'El email que ingresaste no es valido <br>';
      entrar = true;
    }
    if(contraseña !== confirmarContraseña){
      warnings += 'Las contraseñas no coinciden. Por favor, verifica tus contraseñas. <br>';
      entrar = true;
    }else if(contraseña.length < 8){
      warnings += 'Tu contraseña debe tener un minimo de 8 caracteres';
      entrar = true;
    }
    if(!regexNombre.test(nombre) || nombre == ''){
      warnings += 'Nombre no valido o vacio <br>';
      entrar = true;
    }
    if(!regexNombre.test(apellido) || apellido == ''){
      warnings += 'Apellido no valido o vacio <br>';
      entrar = true;
    }
    if(dni.length < 8){
      warnings += 'Ingrese un dni valido <br>';
      entrar = true;
    }

    // Verificar si el usuario ya existe
    const pacienteExistente = pacientes.find(paciente => paciente.usuario === usuario);
    if (pacienteExistente) {
      warnings +='El usuario ya existe. Por favor, elige otro nombre de usuario. <br>';
      entrar = true;
    }
    

    if(entrar) {
      parrafo.style.color = 'red';
      parrafo.innerHTML = warnings;
    }else{
      parrafo.style.color = 'green';
      parrafo.innerHTML = 'Enviado a un administrador';
    }



  // Verificar si se aceptaron los términos y condiciones
  if (!terminosCond.checked) {
    alert('Debes aceptar los términos y condiciones para registrarte.');
    return;
  }

  // Crea un objeto con los datos del paciente
  const paciente ={
    usuario: usuario,
    email: email,
    contraseña: contraseña,
    confirmarContraseña: confirmarContraseña,
    apellido: apellido,
    nombre: nombre,
    fecNacimiento: fecNacimiento,
    dni: dni,
    rol: 'paciente',

};

// Agregar el nuevo paciente a la lista
if(parrafo.style.color == 'green'){
  pacientes.push(paciente);
}
// Guardar la lista de pacientes actualizada en el almacenamiento local
localStorage.setItem('pacientes', JSON.stringify(pacientes));
  // Limpiar los campos del formulario
  nombreUsuario.value = '';
  direccionEmail.value = '';
  campoPassword.value = '';
  campoRePassword.value = '';
  campoApellido.value = '';
  campoNombre.value = '';
  campoFecNacimiento.value = '';
  campoDni.value = '';
  terminosCond.checked = false;

});



