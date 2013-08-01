$ ( document ).ready( function ( ) {

  //Limpiamos el campo de búsqueda de productos
  $("#search").val('');
  //Y posicionamos el cursor en el campo para llegar y pistolear el producto
  $("#search").focus();

  //En el momento en que el form sea ejecutado
  $( "#searchForm" ).submit( function ( ) {

    //Obtenemos la ruta del action
    var url = $( "#searchForm" ).attr( "action" );

    //Comenzamos a construir la petición POST
    $.post( url , {

          searchID: $( "#search" ).val( ),
          other: "attributes"

    }, function(data){
      //Aquí va la respuesta

        if ( data.responseCode == 200 ) {

          alert( "FUNCIONÓ" );
          $("#search").val('');
          $("#search").focus();
        } else if ( data.responseCode == 400 ) { //bad request

          alert( "TAMBIÉN FUNCIONÓ" );

        }

       });

      return false;

   });

});