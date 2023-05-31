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
  }

  const prestadores = JSON.parse(localStorage.getItem('prestadores') || []);

  const existenciaPrestador = prestadores.find(prestador => prestador.usuario === usuario && prestador.contraseña === contraseña && prestador.rol === rol)
  if(existenciaPrestador){
    const prestadorLogueado = {
      usuario: existenciaPrestador.usuario,
      correo: existenciaPrestador.correo,
      nombre: existenciaPrestador.nombre,
      apellido: existenciaPrestador.apellido,
      contraseña: existenciaPrestador.contraseña,
      contraseña2: existenciaPrestador.contraseña2,
      rol: existenciaPrestador.rol

    }

    alert('Inicio de sesión exitoso!');
  
    window.location.href = '../pages/pagClient.html';
  
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('prestadorLogueado', JSON.stringify(prestadorLogueado));
  } else {
    alert('Nombre de usuario, contraseña o tipo de usuario incorrectos. Por favor, intenta nuevamente.');
  }


  const admin = {
    usuario: 'admin',
    contraseña: 'admin123',
    rol: 'admin'
  }


// Verificar si el usuario y la contraseña coinciden con el usuario admin
if (usuario === admin.usuario && contraseña === admin.contraseña && rol === admin.rol) {
  // Crear un objeto del usuario admin con los datos correspondientes
  const adminLogueado = {
    usuario: admin.usuario,
    contraseña: admin.contraseña,
    rol: admin.rol
  };

  alert('Inicio de sesión exitoso como administrador!');

  // Redirigir a la página de administrador
  window.location.href = '../pages/pagAdmin.html';

  localStorage.setItem('isLoggedIn', true);
  localStorage.setItem('adminLogueado', JSON.stringify(adminLogueado));
}


  document.getElementById('form-login').reset();
});


