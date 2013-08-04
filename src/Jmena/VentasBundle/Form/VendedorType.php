<?php

namespace Jmena\VentasBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class VendedorType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('rut' , null , array ( 'label' => 'RUT' ))
            ->add('nombre' , null , array ( 'label' => 'Nombre' ))
            ->add('apellidoPa' , null , array ( 'label' => 'Apellido Paterno' ))
            ->add('apellidoMa' , null , array ( 'label' => 'Apellido Materno' ))
            ->add('fono' , null , array ( 'label' => 'Fono Contacto' ))
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Jmena\VentasBundle\Entity\Vendedor'
        ));
    }

    public function getName()
    {
        return 'jmena_ventasbundle_vendedortype';
    }
}
