traerInformacion();
function traerInformacion() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>" + "EMAIL" + "</td>";
    myTable += "<td>" + "CONTRASEÑA" + "</td>";
    myTable += "<td>" + "NOMBRE" + "</td>";
    myTable += "<td>" + "EDAD" + "</td>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].password + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td> <button onclick='borrarElemento(" + items[i].idClient + ")'>Eliminar</button>";
        myTable += "<td> <button onclick='obtenerItemEspecifico(" + items[i].idClient + ")'>cargar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion() {
    let myData = {
        idClient: $("#idClient").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    };
    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Client/save",
            type: "POST",
            data: dataToSend,
            datatype: "JSON",
            contentType: 'application/json',
            success: function () {
                limpiarCampos();
                traerInformacion();
                alert("REGISTRO CREADO!");
            }
        });
    }
}

function editarInformacion() {
    let myData = {
        idClient: $("#idClient").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    };
    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                limpiarCampos();
                traerInformacion();
                alert("REGISTRO ACTUALIZADO!");
            }
        });
    }
}

function borrarElemento(idElemento) {
    let myData = {
        idClient: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.121.149:8080/api/Client/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO BORRADO!");
        }
    });
}

function limpiarCampos() {
    $("#resultado").empty();
    $("#idClient").val("");
    $("#email").val("");
    $("#password").val("");
    $("#name").val("");
    $("#age").val("");
}

function validaesVacio(dato) {
    return !dato.trim().length;
}

function validar() {
    //obtiene valores
    let email = $("#email").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let age = $("#age").val();

    //valida que los campos no sean vacios

    if (validaesVacio(email)) {
        errores = "email vacio<br>";
        alert("Espacio vacio");
        $("#email").focus();
        return false;
    } else if (validaesVacio(password)) {
        errores = "password vacio<br>";
        alert("Espacio vacio");
        $("#password").focus();
        return false;
    } else if (validaesVacio(name)) {
        errores = "name vacio<br>";
        alert("Espacio vacio");
        $("#name").focus();
        return false;
    } else if (validaesVacio(age)) {
        errores = "age vacio<br>";
        alert("Espacio vacio");
        $("#age").focus();
        return false;
    } else {
        return true;
    }
}

function obtenerItemEspecifico(idItem) {
    $.ajax({
        dataType: 'json',
        url: "http://129.151.121.149:8080/api/Client/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var item = response;

            $("#idClient").val(item.idClient);
            $("#email").val(item.email);
            $("#password").val(item.password);
            $("#name").val(item.name);
            $("#age").val(item.age);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}