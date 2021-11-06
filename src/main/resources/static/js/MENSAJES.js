traerInformacion();

function traerInformacion() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
            traerClient();
            traerGame();
        }
    });
}

function pintarRespuesta(items) {
    let myTable = "<table>";
    myTable += "<tr>";

    myTable += "<td>" + "MENSAJE" + "</td>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable += "<td> <button onclick='borrarElemento(" + items[i].idMessage + ")'>Eliminar</button>";
        myTable += "<td> <button onclick='obtenerItemEspecifico(" + items[i].idMessage + ")'>cargar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion() {
    let myData = {
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val(),
        client: {"idClient": $("#client").val()},
        game: {"id": $("#game").val()}
    };
    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Message/save",
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
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val(),
        client: {"idClient": $("#client").val()},
        game: {"id": $("#game").val()}
    };

    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Message/update",
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
        idMessage: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.121.149:8080/api/Message/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO ELIMINADO!");
        }
    });
}

function limpiarCampos() {
    $("#resultado").empty();
    $("#idMessage").val("");
    $("#messageText").val("");
    $("#client").val("");
    $("#game").val("");
}

function validaesVacio(dato) {
    return !dato.trim().length;
}

function validar() {
    //obtiene valores

    let messageText = $("#messageText").val();
    let client = $("#client").val();
    let game = $("#game").val();

    //valida que los campos no sean vacios
    if (validaesVacio(messageText)) {
        errores = "messageText vacio<br>";
        alert("Espacio vacio");
        $("#messageText").focus();
        return false;
    } else if (validaesVacio(client)) {
        errores = "client vacio<br>";
        alert("Espacio vacio");
        $("#client").focus();
        return false;
    } else if (validaesVacio(game)) {
        errores = "game vacio<br>";
        alert("Espacio vacio");
        $("#game").focus();
        return false;
    } else {
        return true;
    }
}

function obtenerItemEspecifico(idItem) {
    $.ajax({
        dataType: 'json',
        url: "http://129.151.121.149:8080/api/Message/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var item = response;

            $("#idMessage").val(item.idMessage);
            $("#messageText").val(item.messageText);
            $("#client").val(item.client);
            $("#game").val(item.game);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function traerClient() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            listarClient(respuesta);
        }
    });
}

function listarClient(items) {
    var lista = '<option value="">--Selecciona un Cliente--</option>';

    for (i = 0; i < items.length; i++) {

        lista += "<option value=" + items[i].idClient + ">" + items[i].name + "</option>";
    }

    $("#client").html(lista);
}

function traerGame() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Game/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //console.log(respuesta);
            listarGame(respuesta);
        }
    });
}

function listarGame(items) {
    var lista = '<option value="">--Selecciona una Cuatrimoto--</option>';

    for (i = 0; i < items.length; i++) {

        lista += "<option value=" + items[i].id + ">" + items[i].name + "</option>";
    }

    $("#game").html(lista);
}    