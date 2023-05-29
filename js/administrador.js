//Validar los inputs del formulario antes de realizar el submit

function validateForm(){
    const usuario = document.getElementById("usuario").value;
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const correo = document.getElementById("correo").value;
    const tipoDeUsuario = document.getElementById("tipoDeUsuario").value;

    if(usuario == ""){
        alert("Usuario es requerido");
        return false;
    }

    if(nombreCompleto == ""){
        alert("Nombre es requerido.");
        return false;
    }

    if(correo == ""){
        alert("Correo es requerido.");
        return false;
    }
    else if(!correo.includes("@")) {
        alert("Correo es invalido");
        return false;
    }

    if(tipoDeUsuario == ""){
        alert("Tipo de usuario es requerido");
        return false;
    }
    
    return true; 
}



//Funcion para mostrar informacion del local storage
function showData(){
    let peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    let html = "";
    peopleList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.usuario + "</td>";
        html += "<td>" + element.nombreCompleto + "</td>";
        html += "<td>" + element.correo + "</td>";
        html += "<td>" + element.tipoDeUsuario + "</td>";
        html += 
        '<td><button onclick= "deleteData(' + 
        index + 
        ')" class="btn btn-primary">Eliminar</button><button onclick= "updateData(' + 
        index + 
        ')" class="btn btn-dark m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

//Carga toda informacon del local storage cuando el documento o la pagina carga
document.onload = showData();

//funcion para agregar informacion al local storage

function AddData(){
    //si el formulario es validado
    if(validateForm() == true){
        let usuario = document.getElementById("usuario").value;
        let nombreCompleto = document.getElementById("nombreCompleto").value;
        let correo = document.getElementById("correo").value;
        let tipoDeUsuario = document.getElementById("tipoDeUsuario").value;

        let peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            usuario : usuario,
            nombreCompleto : nombreCompleto,
            correo : correo,
            tipoDeUsuario : tipoDeUsuario,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("usuario").value = "";
        document.getElementById("nombreComleto").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("tipoDeUsuario").value = "";
    }
}

// Funcion para eliminar informacion del local storage
function deleteData(index){
    let peopleList;
    if(localStorage.getItem("peopleList") == null)  {
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// funcion para actualizar/editar la informacion del local storage

function updateData(index){
    //boton de actualizar estara oculto y el boton de agregar se mostrara 
    document.getElementById("Submit").style.display = "none"; 
    document.getElementById("Update").style.display = "block";
    let peopleList;
    if(localStorage.getItem("peopleList") == null)  {
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("usuario").value = peopleList[index].usuario;
    document.getElementById("nombreCompleto").value = peopleList[index].nombreCompleto;
    document.getElementById("correo").value = peopleList[index].correo;
    document.getElementById("tipoDeUsuario").value = peopleList[index].tipoDeUsuario.usuario;

    document.querySelector("#Update").onclick = function (){
        if(validateForm() == true){
            peopleList[index].usuario = document.getElementById("usuario").value;
            peopleList[index].nombreCompleto = document.getElementById("nombreCompleto").value;
            peopleList[index].correo = document.getElementById("correo").value;
            peopleList[index].tipoDeUsuario = document.getElementById("tipoDeUsuario").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("usuario").value = "";
            document.getElementById("nombreCompleto").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("tipoDeUsuario").value = "";

    //boton de editar se ocultara y el boton de agregar se mostrara
    document.getElementById("Submit").style.display = "block"; 
    document.getElementById("Update").style.display = "none";

        }

    }
}


