<?php

namespace Jmena\VentasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Categoria
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Categoria
{
    /**
    * @ORM\OneToMany(targetEntity="Producto", mappedBy="categoria")
    */
    protected $productos;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="Descripcion", type="string", length=255)
     */
    private $descripcion;

    /*
        The code in the __construct() method is important because Doctrine requires the $products
        property to be an ArrayCollection object. This object looks and acts almost exactly like an array,
        but has some added flexibility. If this makes you uncomfortable, don't worry. Just imagine that it's
        an array and you'll be in good shape.
    */
    public function __construct() {
        $this->productos = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     * @return Categoria
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;
    
        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string 
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Add productos
     *
     * @param \Jmena\VentasBundle\Entity\Producto $productos
     * @return Categoria
     */
    public function addProducto(\Jmena\VentasBundle\Entity\Producto $productos)
    {
        $this->productos[] = $productos;
    
        return $this;
    }

    /**
     * Remove productos
     *
     * @param \Jmena\VentasBundle\Entity\Producto $productos
     */
    public function removeProducto(\Jmena\VentasBundle\Entity\Producto $productos)
    {
        $this->productos->removeElement($productos);
    }

    /**
     * Get productos
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getProductos()
    {
        return $this->productos;
    }
}