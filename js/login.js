
// Escuchar el evento submit del formulario
document.getElementById('form-login').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Obtener los valores de los campos
  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;
  const rol = document.getElementById('rol').value;

  // Obtener usuarios existentes del almacenamiento local
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  const prestadores = JSON.parse(localStorage.getItem('prestadores')) || [];

  // Verificar si el usuario existe y la contraseña coincide
  const existenciaPaciente = pacientes.find(paciente => paciente.usuario === usuario && paciente.contraseña === contraseña && paciente.rol === rol);
  if (existenciaPaciente) {
    alert('Inicio de sesión exitoso!');
    // redirigir a la página de Cliente
      window.location.href = '../pages/pagClient.html'
      // window.location.assign('../pages/pagClient.html');
      // Guardar el estado de inicio de sesión en el localStorage
      localStorage.setItem('isLoggedIn', true);

  } else {
    alert('Nombre de usuario, contraseña o tipo de usuario incorrectos. Por favor, intenta nuevamente.');
  }


  const existenciaPrestador = prestadores.find(prestadores => prestadores.usuario === usuario && prestadores.password === password && prestadores.rol ===rol);
  if(existenciaPrestador){
  alert('Inicio de sesion exitoso!');
  //redirigi a la pagina de prestadores
  window.location.href = '../pages/pagProfes.html'
  // window.location.assign('../pages/pagPrestadores.html');
  // guardar el estado de inicio de sesion en el localStorage
  localStorage.setItem('isLoggedIn',true);

  }else{
  alert('Nombre de usuario, contraseña o tipo de usuario son incorrectos. Por favor, intente nuevamente.'); 
  }


  // Limpiar los campos del formulario
  document.getElementById('usuario').value = '';
  document.getElementById('password').value = '';
});



