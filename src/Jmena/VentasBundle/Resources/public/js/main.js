var subTotal = 0;

function precioInt ( price ) {

  var precio = price.split ( "$" );
  return ( parseInt ( precio[1] ) );

}

$ ( document ).ready( function ( ) {

  $( document ).on ( "change" ,  "input.descuento" , function() {

    var total = precioInt ( $( "#SUBTOTAL" ).text( ) );
    var dscto = $( ".descuento" ).val ( );

    total = total - ( (dscto/100) * total );

    $( "#TOTAL" ).text ( "$ " + total );

  });

  $( document ).on ( "change" ,  "input.cantidad" , function() {

    var fila = $(this).closest( "tr" );
    var codigo = $( fila ).find( "#codigo" ).text();

    var stock = parseInt ( $( "#stock_"+codigo ).val( ) );
    var cantidad = parseInt ( $( this ).val( ) );

    if ( stock >= cantidad ) {
      var precio = parseInt ( $( fila ).find( "#precio" ).text());

      var sub = parseInt ( $( fila ).find( "#subtotal" ).text());

      //Descontamos lo anterior al SUBTOTAL general
      var total = precioInt ( $( "#SUBTOTAL" ).text( ) );
      subTotal = total - sub;

      $( fila ).find( "#subtotal" ).text( ( precio * cantidad ) );
      subTotal = subTotal + ( precio * cantidad )
      $( "#SUBTOTAL" ).text ( "$ " + subTotal );

      total = precioInt ( $( "#SUBTOTAL" ).text( ) );
      var dscto = $( ".descuento" ).val ( );

      total = total - ( (dscto/100) * total );

      $( "#TOTAL" ).text ( "$ " + total );

    } else {

        $(".stockProducto").empty();
        $(".stockProducto").append(stock);
        $(function() {
          $( "#dialog-stock" ).dialog({
            resizable: false,
            draggable: false,
            width:300,
            modal: true,
            buttons: {
              Cerrar: function() {
                $( this ).dialog( "close" );
              }
            }
          });
        });
        $( this ).val( '1' );

    }

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
    var flag;

    var intRegex = /[0-9 -()+]+$/;
    if ( searchCode.match( intRegex ) > 0 )
      //es un código
      flag = 1;
    else
      //no es un código
      flag = 0;

    //Hay que validar si el producto ya se encuentra en venta, para aumentar su cantidad
    if ( $("#elementos_"+searchCode).length == 0 ) { //No existe

      //Comenzamos a construir la petición POST
      $.post( url , {

            searchID: searchCode,
            validation: flag

      }, function(data){
        //Aquí va la respuesta

          if ( data.responseCode == 200 ) {

            if ( parseInt ( data.stock ) > 0 ) {

              var cantidad = "<input id='cantidad_"+searchCode+"' class='cantidad' type='text' value='1' size='4px'></input>";
              var stock = "<input id='stock_"+searchCode+"'' class='stock' type='hidden' value='"+data.stock+"'></input>";

              $("#elementos").append("<tr id='elementos_"+searchCode+"'></tr>");
              $("#elementos_"+searchCode).append("<td id='codigo'>"+searchCode+"</td>");
              $("#elementos_"+searchCode).append("<td>"+data.marca+"</td>");
              $("#elementos_"+searchCode).append("<td>"+data.categoria+"</td>");
              $("#elementos_"+searchCode).append("<td>"+data.descripcion+"</td>");
              $("#elementos_"+searchCode).append("<td id='precio'>"+data.precio+"</td>");
              $("#elementos_"+searchCode).append("<td>"+cantidad+"</td>");
              $("#elementos_"+searchCode).append("<td id='subtotal'> "+data.precio+"</td>");
              $("#elementos_"+searchCode).append("<td></td>");
              $("#elementos_"+searchCode).append(stock);

            } else {

              $(function() {
                $( "#dialog-error" ).dialog({
                  resizable: false,
                  draggable: false,
                  width:310,
                  modal: true,
                  buttons: {
                    Cerrar: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                });
              });

            }

            $("#search").val('');
            $("#search").focus();

            subTotal = precioInt ( $( "#SUBTOTAL" ).text( ) );
            total = subTotal + data.precio;

            if ( subTotal == 0 ){

              $( "#SUBTOTAL" ).text ( "$ " + data.precio );

            } else {
              
              $( "#SUBTOTAL" ).text ( "$ " + total );

            }

            var dscto = $( ".descuento" ).val ( );

            total = total - ( (dscto/100) * total );

            $( "#TOTAL" ).text ( "$ " + total );
            

          } else if ( data.responseCode == 400 ) { //bad request

            alert( "Producto no existe!" );

          } else { //en el caso de ingresar una descripcion para cargar los productos que coinciden

            $("#elements").empty();
            $.each (data, function ( pos ) {

              if ( data[pos].stock > 0 ) {
                $("#elements").append("<tr id='elements_"+data[pos].codigo+"'></tr>");
                $("#elements_"+data[pos].codigo).append("<td id='codigo'>"+data[pos].codigo+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='maDesc'>"+data[pos].maDesc+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='catDesc'>"+data[pos].catDesc+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='proDesc'>"+data[pos].proDesc+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='precio'>$ "+data[pos].valor+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='stockProd'>"+data[pos].stock+"</td>");
              }

            });

            $( document ).on ( "click" ,  "#elements > tr" , function() {

              var fila = $(this).closest( "tr" );

              var codigo = $( fila ).find( "#codigo" ).text();
              var marca = $( fila ).find( "#maDesc" ).text();
              var categoria = $( fila ).find( "#catDesc" ).text();
              var descripcion = $( fila ).find( "#proDesc" ).text();
              var precio = $( fila ).find( "#precio" ).text();
              var stock = $( fila ).find( "#stockProd" ).text();
                  stock = "<input id='stock_"+codigo+"'' class='stock' type='hidden' value='"+stock+"'></input>";

              var cantidad = "<input id='cantidad_"+codigo+"' class='cantidad' type='text' value='1' size='4px'></input>";              

              $("#elementos").append("<tr id='elementos_"+codigo+"'></tr>");
              $("#elementos_"+codigo).append("<td id='codigo'>"+codigo+"</td>");
              $("#elementos_"+codigo).append("<td>"+marca+"</td>");
              $("#elementos_"+codigo).append("<td>"+categoria+"</td>");
              $("#elementos_"+codigo).append("<td>"+descripcion+"</td>");
              $("#elementos_"+codigo).append("<td id='precio'>"+precio+"</td>");
              $("#elementos_"+codigo).append("<td>"+cantidad+"</td>");
              $("#elementos_"+codigo).append("<td id='subtotal'> "+precio+"</td>");
              $("#elementos_"+codigo).append("<td></td>");
              $("#elementos_"+codigo).append(stock);

              $( this ).fadeOut("slow");

            });

            $(function() {
              $( "#dialog" ).dialog({
                autoOpen: true,
                height: 550,
                width: 1100,
                modal: true,
                draggable: false,
                resizable: false,
                show: {
                  effect: "bounce",
                  duration: 800
                },
                hide: {
                  effect: "slide",
                  duration: 800
                }
              });
            });


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

      var dscto = $( ".descuento" ).val ( );

      total = total - ( (dscto/100) * total );

      $( "#TOTAL" ).text ( "$ " + total );

      $("#search").val('');
      $("#search").focus();

    }
    return false;
  });
});