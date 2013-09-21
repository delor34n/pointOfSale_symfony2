<?php

namespace Jmena\VentasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Jmena\VentasBundle\Entity\Producto;
use Jmena\VentasBundle\Entity\Marca;
use Jmena\VentasBundle\Entity\Categoria;

class DefaultController extends Controller
{
    public function indexAction( ) {

        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('JmenaVentasBundle:Vendedor')->findAll();

        //Le enviamos a la vista la lista de todos los vendedores

        return $this->render('JmenaVentasBundle:Default:index.html.twig', array( 'vendedores' => $entities));
    }

    public function buscarProductoAction ( ) {

  		$request = $this -> get( 'request' );
     	$id = $request -> request -> get( 'searchID' );
      $flag = $request -> request -> get ( 'validation' );   		
      $em = $this -> getDoctrine( ) -> getRepository ( 'JmenaVentasBundle:Producto' );

      if ( $flag == 1 ) {
        //En el caso en que sea un código
        $producto = $em -> findOneByCodigo( $id );

        if ( $producto != "" ) { //Si no se ingreso o el ID del producto no existe

          $return = array(

            "responseCode" => 200,
            "descripcion" => $producto -> getDescripcion( ),
            "precio" => $producto -> getValor( ),
            "marca" =>  $producto -> getMarca( ) -> getDescripcion ( ),
            "categoria" => $producto -> getCategoria ( ) -> getDescripcion ( ),
            "stock" => $producto -> getStock ( )

          );

        } else {

          $return = array( "responseCode" => 400 , "error" => "ERROR" );
        }

      } else {
        //En el caso en que no sea un código y sea un nombre o algo que esté dentro de las descripciones
        //del producto.

        $return = $em -> findAllProducts ( $id );

      }

  		$return = json_encode( $return ); //Codificamos la respuesta en json

  		//Y nos aseguramos que tenga el correcto content type
  		return new Response( $return , 200 , array( 'Content-Type' => 'application/json' ) );

    }

}