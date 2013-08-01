<?php

namespace Jmena\VentasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Jmena\VentasBundle\Entity\Producto;

class DefaultController extends Controller
{
    public function indexAction( ) {
        return $this->render('JmenaVentasBundle:Default:index.html.twig', array('name' => 'Sebastián'));
    }

    public function buscarProductoAction ( ) {

		$request = $this -> get( 'request' );
	   	$id = $request -> request -> get( 'searchID' );
   		$repository = $this -> getDoctrine( ) -> getRepository ( 'JmenaVentasBundle:Producto' );
   		$producto = $repository -> findOneByCodigo( $id );

   		if ( $producto != "" ) { //Si no se ingreso o el ID del producto no existe

    		$return = array( 
    			"responseCode" => 200,
    			"descripcion" => $producto -> getDescripcion( ),
    			"precio" => $producto -> getValor( )
    		);

   		} else {

   			$return = array( "responseCode" => 400 , "error" => "ERROR" );
   		}

		$return = json_encode( $return ); //Codificamos la respuesta en json

		//Y nos aseguramos que tenga el correcto content type
		return new Response( $return , 200 , array( 'Content-Type' => 'application/json' ) );

    }

}
