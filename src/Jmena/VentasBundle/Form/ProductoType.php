<?php

namespace Jmena\VentasBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProductoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('codigo', null , array ( 'label' => 'Código' ) )
            ->add('descripcion', null , array ( 'label' => 'Descripción' ) )
            ->add('stock', null , array ( 'label' => 'Stock' ) )
            ->add('alarma', null , array ( 'label' => 'Alarma' ) )
            ->add('valor', null , array ( 'label' => 'Valor' ) )
            ->add('rutaImagen', null , array ( 'label' => 'Ruta Imagen' ) )
            ->add('categoria', null , array ( 'label' => 'Categoria' ) )
            ->add('marca', null , array ( 'label' => 'Marca' ) )
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Jmena\VentasBundle\Entity\Producto'
        ));
    }

    public function getName()
    {
        return 'jmena_ventasbundle_productotype';
    }
}
