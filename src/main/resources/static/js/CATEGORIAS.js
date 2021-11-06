traerInformacion();

function traerInformacion(){
    $.ajax({
        url:"http://129.151.121.149:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(items){
    let myTable="<table>";
        myTable+="<tr>";    
        myTable+="<td>"+"NOMBRE"+"</td>";
        myTable+="<td>"+"DESCRIPCION"+"</td>";
        myTable+="<td>"+"ACCIONES"+"</td>";
        myTable+="</tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";

        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Eliminar</button></td>";
        myTable+="<td> <button onclick='obtenerItemEspecifico("+items[i].id+")'>cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}    

function guardarCategoria(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val() 
    };
    let dataToSend=JSON.stringify(myData);
  if (validar()){
    $.ajax({
        url:"http://129.151.121.149:8080/api/Category/save",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        contentType:'application/json',
        success:function(){
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO CREADO!");
        }
    });
    }
}

function editarCategoria(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()
    };
    //console.log(myData);
    let dataToSend=JSON.stringify(myData);
    if (validar()){
    $.ajax({
        url:"http://129.151.121.149:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO ACTUALIZADO!");
        }
    });
    }
}

function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.121.149:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO BORRADO!");
        }
    });
}

function limpiarCampos(){
    $("#resultado").empty();
    $("#id").val("");
    $("#name").val("");
    $("#description").val("");
}

function validaesVacio(dato){
    return !dato.trim().length;
}

function validar(){
    //obtiene valores
    let name= $("#name").val();
    let description = $("#description").val();
    //valida que los campos no sean vacios
    if( validaesVacio(name)) { 
        errores="name vacio<br>";
        alert("Espacio vacio");
        $("#name").focus();
        return false;
    }else if( validaesVacio(description)) {
        errores="description vacio<br>";
        alert("Espacio vacio");
        $("#description").focus();
        return false;
    }else{
        return true;
    }
}

function obtenerItemEspecifico(idItem){
    $.ajax({
        dataType: 'json',
        url:"http://129.151.121.149:8080/api/Category/"+idItem,
        type:'GET',
        success:function(response) {
          console.log(response);
          var item=response;
          $("#id").val(item.id);
          $("#name").val(item.name);
          $("#description").val(item.description);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
  
  }