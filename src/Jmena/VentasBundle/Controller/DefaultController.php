<?php

namespace Jmena\VentasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction( ) {
        return $this->render('JmenaVentasBundle:Default:index.html.twig', array('name' => 'Sebastián'));
    }

    public function buscarProducto ( Request $request ) {

    	if ( $request->isXmlHttpRequest ( ) ){

    	}

    }

}
