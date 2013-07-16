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
            ->add('descripcion')
            ->add('stock')
            ->add('valor')
            ->add('alarma')
            ->add('rutaImagen')
            ->add('categoria')
            ->add('marca')
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
