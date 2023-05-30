const formDatosPersProf = document.getElementById('formDatosPersProf');
const inputs = document.querySelectorAll('#formDatosPersProf input');


const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    dni: /^\d{8,8}$/, // 8 numeros.
    profesion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    matricula: /^\d{4,6}$/, // 4 a 6 numeros.
    domicilio: /^[a-zA-ZÀ-ÿ\s\_\-]{1,40}$/, // Letras y espacios, guion y guion_bajo, pueden llevar acentos.
    codPostal: /^[a-zA-Z0-9]{4,8}$/, // Letras, numeros
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false, 
    apellido: false,
    dni: false,
    profesion: false,
    matricula: false,
    domicilio: false,
    codPostal: false,
	telefono: false,
}

const validarFormulario = (e)=>{
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
        break;
        case "profesion":
            validarCampo(expresiones.profesion, e.target, 'profesion');
        break;
        case "matricula":
            validarCampo(expresiones.matricula, e.target, 'matricula');
        break;
        case "domicilio":
            validarCampo(expresiones.domicilio, e.target, 'domicilio');
        break;
        case "codPostal":
            validarCampo(expresiones.codPostal, e.target, 'codPostal');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }

}

const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto'); 
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle'); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}


inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario );
    input.addEventListener('blur', validarFormulario );
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');

    if(campos.nombre && campos.apellido && campos.dni && campos.correo && campos.password && terminos.checked){
        formulario.reset();

       document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 4000); 

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        })
    } else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
  
});