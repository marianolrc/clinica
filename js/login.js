/*
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const role = document.querySelector('#role').value;

  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  localStorage.setItem('role', role);

  // redirigir a la página de inicio
  window.location.href = '/inicio.html';
});
 */


const form = document.querySelector('#form-login');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#loginName').value;
  const password = document.querySelector('#loginPassword').value;
  const role = document.querySelector('#role').value;

  localStorage.setItem('loginName', username);
  localStorage.setItem('loginPassword', password);
  localStorage.setItem('role', role);

  // redirigir a la página de inicio
  window.location.href = '../pages/pagCliente.html';
});

/*
const role = localStorage.getItem('role');

if (role === 'admin') {
  // mostrar opciones de administrador
} else {
  // mostrar opciones de usuario normal
}
 */