document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('sesion-tab');
  
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault(); // Evitar que se siga el enlace
      
      // Eliminar el estado de inicio de sesión del localStorage
      localStorage.removeItem('isLoggedIn');
      
      // Redirigir a la página de inicio de sesión
      window.location.href = '../index.html'; 
    });
  });
  