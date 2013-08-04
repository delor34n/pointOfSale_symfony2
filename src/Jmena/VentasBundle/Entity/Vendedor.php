<?php

namespace Jmena\VentasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Vendedor
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Jmena\VentasBundle\Entity\VendedorRepository")
 */
class Vendedor
{
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
     * @ORM\Column(name="rut", type="string", length=255)
     */
    private $rut;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=255)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="apellidoPa", type="string", length=255)
     */
    private $apellidoPa;

    /**
     * @var string
     *
     * @ORM\Column(name="apellidoMa", type="string", length=255)
     */
    private $apellidoMa;

    /**
     * @var integer
     *
     * @ORM\Column(name="fono", type="integer")
     */
    private $fono;

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
     * Set rut
     *
     * @param string $rut
     * @return Vendedor
     */
    public function setRut($rut)
    {
        $this->rut = $rut;
    
        return $this;
    }

    /**
     * Get rut
     *
     * @return string 
     */
    public function getRut()
    {
        return $this->rut;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return Vendedor
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    
        return $this;
    }

    /**
     * Get nombre
     *
     * @return string 
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set apellidoPa
     *
     * @param string $apellidoPa
     * @return Vendedor
     */
    public function setApellidoPa($apellidoPa)
    {
        $this->apellidoPa = $apellidoPa;
    
        return $this;
    }

    /**
     * Get apellidoPa
     *
     * @return string 
     */
    public function getApellidoPa()
    {
        return $this->apellidoPa;
    }

    /**
     * Set apellidoMa
     *
     * @param string $apellidoMa
     * @return Vendedor
     */
    public function setApellidoMa($apellidoMa)
    {
        $this->apellidoMa = $apellidoMa;
    
        return $this;
    }

    /**
     * Get apellidoMa
     *
     * @return string 
     */
    public function getApellidoMa()
    {
        return $this->apellidoMa;
    }

    /**
     * Set fono
     *
     * @param integer $fono
     * @return Vendedor
     */
    public function setFono($fono)
    {
        $this->fono = $fono;
    
        return $this;
    }

    /**
     * Get fono
     *
     * @return integer
     */
    public function getFono()
    {
        return $this->fono;
    }
}