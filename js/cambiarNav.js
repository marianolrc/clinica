document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navbarLogin = document.getElementById('navbar-login');
    const navbarReg = document.getElementById('navbar-reg');
    const navbarLogout = document.getElementById('navbar-logout');
    const logoutLink = document.getElementById('logout-link');
  //Cambia el estado del navbar
    if (isLoggedIn) {
      navbarLogin.style.display = 'none';
      navbarReg.style.display = 'none'
      navbarLogout.style.display = 'block';
    } else {
      navbarLogin.style.display = 'block';
      navbarReg.style.display = 'block'
      navbarLogout.style.display = 'none';
    }
  
    logoutLink.addEventListener('click', function(e) {
      // Eliminar el estado de inicio de sesión del localStorage
      localStorage.removeItem('isLoggedIn');
      
      // Redirigir a la página de inicio de sesión
      window.location.href = '../index.html';
    });
    
  });