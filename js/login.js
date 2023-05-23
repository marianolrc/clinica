
// Escuchar el evento submit del formulario
document.getElementById('form-login').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Obtener los valores de los campos
  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;
  const rol = document.getElementById('rol').value;

  // Obtener usuarios existentes del almacenamiento local
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  // Verificar si el usuario existe y la contraseña coincide
  const existenciaPaciente = pacientes.find(paciente => paciente.usuario === usuario && paciente.contraseña === contraseña && paciente.rol === rol);
  if (existenciaPaciente) {
    alert('Inicio de sesión exitoso!');
    // Realizar la redirección a la página deseada

    // redirigir a la página de Cliente
    // window.location.href = 'http://127.0.0.1:5500/pages/pagClient.html';
      window.location.href = 'pagClient.html'
      // window.location.assign('../pages/pagClient.html');

  } else {
    alert('Nombre de usuario, contraseña o tipo de usuario incorrectos. Por favor, intenta nuevamente.');
  }

  // Limpiar los campos del formulario
  document.getElementById('usuario').value = '';
  document.getElementById('password').value = '';


});






/*
const role = localStorage.getItem('role');

if (role === 'admin') {
  // mostrar opciones de administrador
} else {
  // mostrar opciones de usuario normal
}
 */