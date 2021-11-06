function reporteStatus() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaStatus(respuesta);

        }
    });
}

function pintarRespuestaStatus(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>" + "RESERVAS EXITOSAS" + "</td>";
    myTable += "<td>" + "RESERVAS CANCELADAS" + "</td>";
    myTable += "</tr>";
    myTable += "<tr>";
    myTable += "<td>" + items.completed + "</td>";
    myTable += "<td>" + items.cancelled + "</td>";
    myTable += "</tr>";
    myTable += "</table>";
    $("#resultado").empty();
    $("#resultado").append(myTable);
}

function reporteFechas() {
    var fechaInicial = document.getElementById("fechaInicial").value;
    var fechaFinal = document.getElementById("fechaFinal").value;

    $.ajax({
        url: "http://129.151.121.149:8080/api/Reservation/report-dates/" + fechaInicial + "/" + fechaFinal,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaFechas(respuesta);

        }
    });
}

function pintarRespuestaFechas(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>" + "DIA INICIO" + "</td>";
    myTable += "<td>" + "DIA FINAL" + "</td>";
    myTable += "<td>" + "ESTADO RESERVA" + "</td>";
    myTable += "<td>" + "JUEGO" + "</td>";
    myTable += "<td>" + "CLIENTE" + "</td>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].startDate + "</td>";
        myTable += "<td>" + items[i].devolutionDate + "</td>";
        myTable += "<td>" + items[i].status + "</td>";
        myTable += "<td>" + items[i].game.name + "</td>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultado").empty();
    $("#resultado").append(myTable);
}

function reporteTop() {
    $.ajax({
        url: "http://129.151.121.149:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaTop(respuesta);
        }
    });
}

function pintarRespuestaTop(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>" + "TOTAL" + "</td>";
    myTable += "<td>" + "CLIENTE" + "</td>";
    myTable += "<td>" + "EMAIL" + "</td>";
    myTable += "<td>" + "EDAD" + "</td>";
    myTable += "</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].total + "</td>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "<td>" + items[i].client.email + "</td>";
        myTable += "<td>" + items[i].client.age + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").empty();
    $("#resultado").append(myTable);
}