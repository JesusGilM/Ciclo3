traerInformacion();

function traerInformacion() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Game/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
            traerCategory();
        }
    });
}

function pintarRespuesta(items) {
    let myTable = "<table>";
    myTable += "<tr>";

    myTable += "<td>" + "NOMBRE" + "</td>";
    myTable += "<td>" + "DEVELOPER" + "</td>";
    myTable += "<td>" + "AÑO" + "</td>";
    myTable += "<td>" + "DESCRIPCION" + "</td>";
    myTable += "<td>" + "ACCIONES" + "</td>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].developer + "</td>";
        myTable += "<td>" + items[i].year + "</td>";
        myTable += "<td>" + items[i].description + "</td>";

        myTable += "<td> <button onclick='borrarElemento(" + items[i].id + ")'>Eliminar</button></td>";
        myTable += "<td> <button onclick='obtenerItemEspecifico(" + items[i].id + ")'>cargar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function guardarJuego() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        developer: $("#developer").val(),
        year: $("#year").val(),
        description: $("#description").val(),
        category: {"id": $("#category").val()}
    };
    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Game/save",
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

function editarJuego() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        developer: $("#developer").val(),
        year: $("#year").val(),
        description: $("#description").val()
    };
    //console.log(myData);
    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Game/update",
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
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.121.149:8080/api/Game/" + idElemento,
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
    $("#id").val("");
    $("#name").val("");
    $("#developer").val("");
    $("#year").val("");
    $("#description").val("");
    $("#category").val("");

}

function validaesVacio(dato) {
    return !dato.trim().length;
}

function validar() {
    //obtiene valores
    let name = $("#name").val();
    let developer = $("#developer").val();
    let year = $("#year").val();
    let description = $("#description").val();
    let category = $("#category").val();


    //valida que los campos no sean vacios

    if (validaesVacio(name)) {
        errores = "name vacio<br>";
        alert("Espacio vacio");
        $("#name").focus();
        return false;
    } else if (validaesVacio(developer)) {
        errores = "developer vacio<br>";
        alert("Espacio vacio");
        $("#developer").focus();
        return false;
    } else if (validaesVacio(year)) {
        errores = "year vacio<br>";
        alert("Espacio vacio");
        $("#year").focus();
        return false;
    } else if (validaesVacio(description)) {
        errores = "description vacio<br>";
        alert("Espacio vacio");
        $("#description").focus();
        return false;
    } else if (validaesVacio(category)) {
        errores = "category vacio<br>";
        alert("Espacio vacio");
        $("#category").focus();
        return false;
    } else {
        return true;
    }
}


function obtenerItemEspecifico(idItem) {
    $.ajax({
        dataType: 'json',
        url: "http://129.151.121.149:8080/api/Game/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name").val(item.name);
            $("#developer").val(item.developer);
            $("#year").val(item.year);
            $("#description").val(item.description);
            $("#category").val(item.category);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function traerCategory() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            listarCategory(respuesta);
        }
    });
}

function listarCategory(items) {
    var lista = '<option value="">--Selecciona una Categoria--</option>';

    for (i = 0; i < items.length; i++) {

        lista += "<option value=" + items[i].id + ">" + items[i].name + "</option>";
    }

    $("#category").html(lista);
}