$ ( document ).ready( function ( ) {

  //Limpiamos el campo de búsqueda de productos
  $("#search").val('');
  //Y posicionamos el cursor en el campo para llegar y pistolear el producto
  $("#search").focus();

  //En el momento en que el form sea ejecutado
  $( "#searchForm" ).submit( function ( ) {

    //Obtenemos la ruta del action
    var url = $( "#searchForm" ).attr( "action" );
    var searchCode = $( "#search" ).val( );

    //Hay que validar si el producto ya se encuentra en venta, para aumentar su cantidad
    if ( $("#elementos_"+searchCode).length == 0 ) { //No existe

      //Comenzamos a construir la petición POST
      $.post( url , {

            searchID: searchCode

      }, function(data){
        //Aquí va la respuesta

          if ( data.responseCode == 200 ) {

            var cantidad = "<input id='cantidad_"+searchCode+"' class='cantidad' type='text' value='1' size='4px'></input>";
            var descuento = "<input id='descuento_"+searchCode+"' class='descuento' type='text' value='0%' size='4px'></input>";

            $("#elementos").append("<tr id='elementos_"+searchCode+"'></tr>");
            $("#elementos_"+searchCode).append("<td>"+searchCode+"</td>");
            $("#elementos_"+searchCode).append("<td>"+data.descripcion+"</td>");
            $("#elementos_"+searchCode).append("<td>"+data.precio+"</td>");
            $("#elementos_"+searchCode).append("<td>"+cantidad+"</td>");
            $("#elementos_"+searchCode).append("<td>"+descuento+"</td>");
            $("#elementos_"+searchCode).append("<td>"+data.precio+"</td>");
            $("#elementos_"+searchCode).append("<td></td>");

            $("#search").val('');
            $("#search").focus();
          } else if ( data.responseCode == 400 ) { //bad request

            alert( "Producto no existe!" );

          }

      });
    } else {

      //Aquí es donde solucionamos el problema de un elemento que se ingrese y sea duplicado.
      //Para esto debemos hacer que aumente la cantidad del mismo elemento... just that (:
      var cantidad = parseInt ( $( "#cantidad_"+searchCode ).val( ) );
      cantidad = cantidad + 1;
      $( "#cantidad_"+searchCode ).val( cantidad );

    }
    return false;
  });
});