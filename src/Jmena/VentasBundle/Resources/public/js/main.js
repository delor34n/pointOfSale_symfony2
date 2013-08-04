var subTotal = 0;

function precioInt ( price ) {

  var precio = price.split ( "$" );
  return ( parseInt ( precio[1] ) );

}

$ ( document ).ready( function ( ) {

  $( document ).on ( "change" ,  "input.cantidad" , function() {

    var fila = $(this).closest( "tr" );

    var cantidad = parseInt ( $( this ).val( ) );
    var precio = parseInt ( $( fila ).find( "#precio" ).text());

    var sub = parseInt ( $( fila ).find( "#subtotal" ).text());

    //Descontamos lo anterior al SUBTOTAL general
    var total = precioInt ( $( "#SUBTOTAL" ).text( ) );
    subTotal = total - sub;

    $( fila ).find( "#subtotal" ).text( ( precio * cantidad ) );
    subTotal = subTotal + ( precio * cantidad )
    $( "#SUBTOTAL" ).text ( "$ " + subTotal );

  });

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

            $("#elementos").append("<tr id='elementos_"+searchCode+"'></tr>");
            $("#elementos_"+searchCode).append("<td>"+searchCode+"</td>");
            $("#elementos_"+searchCode).append("<td>"+data.descripcion+"</td>");
            $("#elementos_"+searchCode).append("<td id='precio'>"+data.precio+"</td>");
            $("#elementos_"+searchCode).append("<td>"+cantidad+"</td>");
            $("#elementos_"+searchCode).append("<td id='subtotal'> $ "+data.precio+"</td>");
            $("#elementos_"+searchCode).append("<td></td>");

            $("#search").val('');
            $("#search").focus();

            subTotal = precioInt ( $( "#SUBTOTAL" ).text( ) );

            if ( subTotal == 0 ){

              $( "#SUBTOTAL" ).text ( "$ " + data.precio );

            } else {

              total = subTotal + data.precio;
              $( "#SUBTOTAL" ).text ( "$ " + total );

            }
            

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

      var fila = $( "#cantidad_"+searchCode ).closest( "tr" );
      var precio = parseInt ( $( fila ).find( "#precio" ).text());
      $( fila ).find( "#subtotal" ).text( ( cantidad * precio ) );
      //hasta aquí todo bien: ingresa uno nuevo y lo agrega al subtotal del producto
      //******************************************

      var total = precioInt ( $( "#SUBTOTAL" ).text( ) );

      total = total + precio;
      $( "#SUBTOTAL" ).text ( "$ " + total );

      $("#search").val('');
      $("#search").focus();

    }
    return false;
  });
});