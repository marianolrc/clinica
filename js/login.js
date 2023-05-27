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
  const existenciaPaciente = pacientes.find(paciente => paciente.usuario === usuario && paciente.password === contraseña && paciente.rol === rol);
  if (existenciaPaciente) {
    // Crear un objeto del usuario logueado con todos los datos del paciente
    const usuarioLogueado = {
      usuario: existenciaPaciente.usuario,
      correo: existenciaPaciente.correo,
      password: existenciaPaciente.password,
      password2: existenciaPaciente.password2,
      apellido: existenciaPaciente.apellido,
      nombre: existenciaPaciente.nombre,
      fecNacimiento: existenciaPaciente.fecNacimiento,
      dni: existenciaPaciente.dni,
      rol: existenciaPaciente.rol
    };
  
    alert('Inicio de sesión exitoso!');
  
    window.location.href = '../pages/pagClient.html';
  
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
  } else {
    alert('Nombre de usuario, contraseña o tipo de usuario incorrectos. Por favor, intenta nuevamente.');
  }

  document.getElementById('form-login').reset();
});


