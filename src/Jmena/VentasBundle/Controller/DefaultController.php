<?php

namespace Jmena\VentasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction( ) {
        return $this->render('JmenaVentasBundle:Default:index.html.twig', array('name' => 'Sebastián'));
    }

    public function buscarProductoAction ( ) {

		$request = $this -> get( 'request' );
	   	$id = $request -> request -> get( 'searchID' );
   
   		if ( $id != "" ) {//if the user has written id

   			$greeting = 'Hello '.$id.'. How are you today?';
    		$return = array( "responseCode" => 200 , "greeting" => $greeting );

   		} else {

   			$return = array( "responseCode" => 400 , "greeting" => "You have to write your name!" );
   		}

		$return = json_encode( $return );//jscon encode the array
		//make sure it has the correct content type
		return new Response( $return , 200 , array( 'Content-Type' => 'application/json' ) );

    }

}
