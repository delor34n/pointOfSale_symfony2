<?php

namespace Jmena\VentasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Producto
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Producto {

    /**
    * @ORM\ManyToOne(targetEntity="Categoria", inversedBy="productos")
    * @ORM\JoinColumn(name="id_categoria", referencedColumnName="id")
    */
    protected $categoria;

    /**
    * @ORM\ManyToOne(targetEntity="Marca", inversedBy="productos")
    * @ORM\JoinColumn(name="id_marca", referencedColumnName="id")
    */
    protected $marca;

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

    /**
     * @var integer
     *
     * @ORM\Column(name="Stock", type="integer")
     */
    private $stock;

    /**
     * @var integer
     *
     * @ORM\Column(name="Valor", type="integer")
     */
    private $valor;

    /**
     * @var integer
     *
     * @ORM\Column(name="Alarma", type="integer")
     */
    private $alarma;

    /**
     * @var string
     *
     * @ORM\Column(name="Ruta_Imagen", type="string", length=255)
     */
    private $rutaImagen;


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
     * @return Producto
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
     * Set stock
     *
     * @param integer $stock
     * @return Producto
     */
    public function setStock($stock)
    {
        $this->stock = $stock;
    
        return $this;
    }

    /**
     * Get stock
     *
     * @return integer 
     */
    public function getStock()
    {
        return $this->stock;
    }

    /**
     * Set valor
     *
     * @param integer $valor
     * @return Producto
     */
    public function setValor($valor)
    {
        $this->valor = $valor;
    
        return $this;
    }

    /**
     * Get valor
     *
     * @return integer 
     */
    public function getValor()
    {
        return $this->valor;
    }

    /**
     * Set alarma
     *
     * @param integer $alarma
     * @return Producto
     */
    public function setAlarma($alarma)
    {
        $this->alarma = $alarma;
    
        return $this;
    }

    /**
     * Get alarma
     *
     * @return integer 
     */
    public function getAlarma()
    {
        return $this->alarma;
    }

    /**
     * Set rutaImagen
     *
     * @param string $rutaImagen
     * @return Producto
     */
    public function setRutaImagen($rutaImagen)
    {
        $this->rutaImagen = $rutaImagen;
    
        return $this;
    }

    /**
     * Get rutaImagen
     *
     * @return string 
     */
    public function getRutaImagen()
    {
        return $this->rutaImagen;
    }

    /**
     * Set categoria
     *
     * @param \Jmena\VentasBundle\Entity\Categoria $categoria
     * @return Producto
     */
    public function setCategoria(\Jmena\VentasBundle\Entity\Categoria $categoria = null)
    {
        $this->categoria = $categoria;
    
        return $this;
    }

    /**
     * Get categoria
     *
     * @return \Jmena\VentasBundle\Entity\Categoria 
     */
    public function getCategoria()
    {
        return $this->categoria;
    }

    /**
     * Set marca
     *
     * @param \Jmena\VentasBundle\Entity\Marca $marca
     * @return Producto
     */
    public function setMarca(\Jmena\VentasBundle\Entity\Marca $marca = null)
    {
        $this->marca = $marca;
    
        return $this;
    }

    /**
     * Get marca
     *
     * @return \Jmena\VentasBundle\Entity\Marca 
     */
    public function getMarca()
    {
        return $this->marca;
    }
}