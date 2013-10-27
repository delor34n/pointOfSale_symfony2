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

    //Comprobamos si la nueva cantidad es menor al stock del producto
    if ( stock >= cantidad ) {

      var precio = precioInt ( $( fila ).find( "#precio" ).text());

      var sub = precioInt ( $( fila ).find( "#subtotal" ).text());

      //Descontamos lo anterior al SUBTOTAL general
      var total = precioInt ( $( "#SUBTOTAL" ).text( ) );
      subTotal = total - sub;

      $( fila ).find( "#subtotal" ).text( "$"+( precio * cantidad ) );
      subTotal = subTotal + ( precio * cantidad )
      $( "#SUBTOTAL" ).text ( "$ " + subTotal );

      total = precioInt ( $( "#SUBTOTAL" ).text( ) );
      var dscto = $( ".descuento" ).val ( );

      total = total - ( (dscto/100) * total );

      $( "#TOTAL" ).text ( "$ " + total );

      parseInt($("#oldCantidad_"+codigo).val(cantidad));

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
        $( this ).val( parseInt($("#oldCantidad_"+codigo).val()));

    }

  });

  //Limpiamos el campo de búsqueda de productos
  $("#search").val('');
  //Y posicionamos el cursor en el campo para llegar y pistolear el producto
  $("#search").focus();

  /*********************************************************************

    En el momento en que el form sea ejecutado para buscar un producto

  **********************************************************************/
  $( "#searchForm" ).submit( function ( ) {

    //Borramos lo que buscamos y...
    $("#search").val('');
    // situamos la búsqueda como el campo activo para disparar con la pistola
    $("#search").focus();

    //Obtenemos la ruta del action
    var url = $( "#searchForm" ).attr( "action" );
    var searchCode = $( "#search" ).val( );
    var flag;

    var intRegex = /[0-9 -()+]+$/;

    //Verificamos qué tipo de búsqueda es, por código o por texto
    if ( searchCode.match( intRegex ) > 0 )
      //es un código
      flag = 1;
    else
      //Es texto
      flag = 0;

    //Hay que validar si el producto ya se encuentra en venta, para aumentar su cantidad
    if ( $("#elementos_"+searchCode).length == 0 ) { 

      //En el caso de que no se encuentre en la venta
      //Comenzamos a construir la petición POST
      $.post( url , {

            searchID: searchCode,
            validation: flag

      }, function(data){
        //Aquí va la respuesta

          if ( data.responseCode == 200 ) {

            //Verificamos si hay stock del producto
            if ( parseInt ( data.stock ) > 0 ) {

              var oldCantidad = "<input id='oldCantidad_"+searchCode+"' class='cantidad' type='hidden' value='1'></input>";
              var cantidad = "<input id='cantidad_"+searchCode+"' class='cantidad' type='text' value='1' size='4px' ></input>";
              //Campo stock nos sirve para verificar cuando se modifique la cantidad y así no realizar dos consultas
              //a la base de datos, sólo lo verificamos en dicho campo.
              var stock = "<input id='stock_"+searchCode+"' class='stock' type='hidden' value='"+data.stock+"'></input>";

              //Agregamos una fila con el código del producto como id
              $("#elementos").append("<tr id='elementos_"+searchCode+"'></tr>");
              //Y sus datos como columnas de dicha fila
              $("#elementos_"+searchCode).append("<td id='codigo'>"+searchCode+"</td>");
              $("#elementos_"+searchCode).append("<td>"+data.marca+"</td>");
              $("#elementos_"+searchCode).append("<td>"+data.categoria+"</td>");
              $("#elementos_"+searchCode).append("<td>"+data.descripcion+"</td>");
              $("#elementos_"+searchCode).append("<td id='precio'>$"+data.precio+"</td>");
              $("#elementos_"+searchCode).append("<td>"+cantidad+"</td>");
              $("#elementos_"+searchCode).append("<td id='subtotal'>$"+data.precio+"</td>");
              $("#elementos_"+searchCode).append("<td></td>");
              $("#elementos_"+searchCode).append(stock);
              $("#elementos_"+searchCode).append(oldCantidad);

              //Calculamos el nuevo total y subtotal
              subTotal = precioInt ( $( "#SUBTOTAL" ).text( ) );

              total = subTotal + data.precio;

              //Si el subtotal es cero...
              if ( subTotal == 0 ){

                // agregamos el precio
                $( "#SUBTOTAL" ).text ( "$ " + data.precio );

              } else {
                
                // sino es cero, sumamos el subtotal anterior con el precio
                // y lo agregamos al campo subtotal
                $( "#SUBTOTAL" ).text ( "$ " + total );
              }

              //Calculamos si hay algún descuento
              var dscto = $( ".descuento" ).val ( );
              //Y lo aplicamos al total
              total = total - ( (dscto/100) * total );
              //Luego lo agregamos
              $( "#TOTAL" ).text ( "$ " + total );

            } else {

              //Esto se ejecuta en el caso de que no haya stock del producto
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

          } else if ( data.responseCode == 400 ) { //Error 400: producto no existe

            alert( "Producto no existe!" );

          } else { //el siguiente código se ejecutará cuando se realice una búsqueda por el nombre, marca, descripción del producto

            //Limpiamos el campo que almacena la búsqueda de los productos
            $("#elements").empty();

            //Iteramos sobre el resultado de la consulta
            $.each (data, function ( pos ) {

              //Si el stock del producto es mayor a cero
              if ( data[pos].stock > 0 ) {

                //agregamos el producto
                $("#elements").append("<tr id='elements_"+data[pos].codigo+"'></tr>");
                $("#elements_"+data[pos].codigo).append("<td id='codigo'>"+data[pos].codigo+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='maDesc'>"+data[pos].maDesc+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='catDesc'>"+data[pos].catDesc+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='proDesc'>"+data[pos].proDesc+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='precio'>$"+data[pos].valor+"</td>");
                $("#elements_"+data[pos].codigo).append("<td id='stockProd'>"+data[pos].stock+"</td>");

              }

            });

            //Mostramos el cuadro con el resultado de la búsqueda
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

            //Eliminamos el evento duplicado del click
            $(document).unbind("click");

            //Esto se ejecutará al hacer click en el resultado de la búsqueda
            $( document ).on ( "click" ,  "#elements > tr" , function() {

              //obtenemos la fila "clickeada"
              var fila = $(this).closest( "tr" );

              //obtenemos el código del producto
              var codigo = $( fila ).find( "#codigo" ).text();

              //Validamos si el producto ya estaba agregado en la venta... en el caso en que no:
              if ( $("#elementos_"+codigo).length == 0 ) {

                var marca = $( fila ).find( "#maDesc" ).text();
                var categoria = $( fila ).find( "#catDesc" ).text();
                var descripcion = $( fila ).find( "#proDesc" ).text();
                var precio = $( fila ).find( "#precio" ).text();
                var stock = $( fila ).find( "#stockProd" ).text();
                    stock = "<input id='stock_"+codigo+"' class='stock' type='hidden' value='"+stock+"'></input>";

                var cantidad = "<input id='cantidad_"+codigo+"' class='cantidad' type='text' value='1' size='4px'></input>";
                var oldCantidad = "<input id='oldCantidad_"+searchCode+"' class='cantidad' type='hidden' value='1'></input>";

                $("#elementos").append("<tr id='elementos_"+codigo+"'></tr>");
                $("#elementos_"+codigo).append("<td id='codigo'>"+codigo+"</td>");
                $("#elementos_"+codigo).append("<td>"+marca+"</td>");
                $("#elementos_"+codigo).append("<td>"+categoria+"</td>");
                $("#elementos_"+codigo).append("<td>"+descripcion+"</td>");
                $("#elementos_"+codigo).append("<td id='precio'>"+precio+"</td>");
                $("#elementos_"+codigo).append("<td>"+cantidad+"</td>");
                $("#elementos_"+codigo).append("<td id='subtotal'>"+precio+"</td>");
                $("#elementos_"+codigo).append("<td></td>");
                $("#elementos_"+codigo).append(stock);
                $("#elementos_"+codigo).append(oldCantidad);

                subTotal = precioInt ( $( "#SUBTOTAL" ).text( ) );
                total = subTotal + precioInt(precio);

                if ( subTotal == 0 ){

                  $( "#SUBTOTAL" ).text ( "$ " + precioInt(precio) );

                } else {
                  
                  $( "#SUBTOTAL" ).text ( "$ " + total );

                }

                var dscto = $( ".descuento" ).val ( );

                total = total - ( (dscto/100) * total );

                $( "#TOTAL" ).text ( "$ " + total );

              } else {

                  //Aquí validamos cuando ya se había agregado el producto a la venta
                  //Para esto debemos hacer que aumente la cantidad del mismo elemento... just that (:
                  var cantidad = parseInt ( $( "#cantidad_"+codigo ).val( ) );
                  cantidad = cantidad + 1;
                  $( "#cantidad_"+codigo ).val( cantidad );
                  $( "#oldCantidad_"+codigo ).val( cantidad );

                  var fila = $( "#cantidad_"+codigo ).closest( "tr" );
                  var precio = precioInt ( $( fila ).find( "#precio" ).text());
                  $( fila ).find( "#subtotal" ).text( ( cantidad * precio ) );
                  //hasta aquí todo bien: ingresa uno nuevo y lo agrega al subtotal del producto
                  //******************************************

                  var total = precioInt ( $( "#SUBTOTAL" ).text( ) );

                  total = total + precio;
                  $( "#SUBTOTAL" ).text ( "$ " + total );

                  var dscto = $( ".descuento" ).val ( );

                  total = total - ( (dscto/100) * total );

                  $( "#TOTAL" ).text ( "$ " + total );

              }

              $( this ).fadeOut("slow");

            });

          }

      });
    } else {

      //Aquí es donde solucionamos el problema de un elemento que se ingrese y sea duplicado.
      //Para esto debemos hacer que aumente la cantidad del mismo elemento... just that (:
      var cantidad = parseInt ( $( "#cantidad_"+searchCode ).val( ) );
      cantidad = cantidad + 1;
      $( "#cantidad_"+searchCode ).val( cantidad );
      $( "#oldCantidad_"+searchCode ).val( cantidad );

      var fila = $( "#cantidad_"+searchCode ).closest( "tr" );
      var precio = precioInt ( $( fila ).find( "#precio" ).text());
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