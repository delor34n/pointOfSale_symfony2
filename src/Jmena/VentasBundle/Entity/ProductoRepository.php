<?php

namespace Jmena\VentasBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * VendedorRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProductoRepository extends EntityRepository {

	public function findAllProducts( $_target ) {

		return $this -> getEntityManager( )
    		->createQuery( "

            	SELECT P.codigo, P.valor, P.descripcion AS proDesc, C.descripcion AS catDesc, M.descripcion AS maDesc
                FROM JmenaVentasBundle:Producto P 
            	INNER JOIN JmenaVentasBundle:Marca M WITH P.marca = M.id 
              	INNER JOIN JmenaVentasBundle:Categoria C WITH P.categoria = C.id 
              	WHERE
              	P.descripcion LIKE '%".$_target."%' OR
                M.descripcion LIKE '%".$_target."%' OR
                C.descripcion LIKE '%".$_target."%'

        		")
            ->getResult( );

	}

}