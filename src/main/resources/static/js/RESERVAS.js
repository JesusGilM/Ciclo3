traerInformacion();

function traerInformacion() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Reservation/all",
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

    myTable += "<td>" + "INICIO" + "</td>";
    myTable += "<td>" + "DEVOLUCION" + "</td>";
    myTable += "<td>" + "ESTATUS" + "</td>";
    myTable += "<td>" + "ACCIONES" + "</td>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].startDate + "</td>";
        myTable += "<td>" + items[i].devolutionDate + "</td>";
        myTable += "<td>" + items[i].status + "</td>";

        myTable += "<td> <button onclick='borrarElemento(" + items[i].idReservation + ")'>Eliminar</button></td>";
        myTable += "<td> <button onclick='obtenerItemEspecifico(" + items[i].idReservation + ")'>cargar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion() {
    let myData = {
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(),
        client: {"idClient": $("#client").val()},
        game: {"id": $("#game").val()}
    };
    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Reservation/save",
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
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        client: {"idClient": $("#client").val()},
        game: {"id": $("#game").val()}
    };
    //console.log(myData);
    let dataToSend = JSON.stringify(myData);
    if (validar()) {
        $.ajax({
            url: "http://129.151.121.149:8080/api/Reservation/update",
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
        idReservation: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.121.149:8080/api/Reservation/" + idElemento,
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
    $("#idReservation").val("");
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#client").val("");
    $("#game").val("");
}

function validaesVacio(dato) {
    return !dato.trim().length;
}

function validar() {
    //obtiene valores

    let startDate = $("#startDate").val();
    let devolutionDate = $("#devolutionDate").val();
    let client = $("#client").val();
    let game = $("#game").val();

    //valida que los campos no sean vacios

    if (validaesVacio(startDate)) {
        errores = "startDate vacio<br>";
        alert("Espacio vacio");
        $("#startDate").focus();
        return false;
    } else if (validaesVacio(devolutionDate)) {
        errores = "devolutionDate vacio<br>";
        alert("Espacio vacio");
        $("#devolutionDate").focus();
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
    alert("YA PUEDES SELECCIONAR LAS FECHAS");
    $.ajax({
        dataType: 'json',
        url: "http://129.151.121.149:8080/api/Reservation/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var item = response;

            $("#idReservation").val(item.idReservation);
            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);

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
    var lista = '<option value="">--Selecciona un Juego--</option>';

    for (i = 0; i < items.length; i++) {

        lista += "<option value=" + items[i].id + ">" + items[i].name + "</option>";
    }

    $("#game").html(lista);
}    