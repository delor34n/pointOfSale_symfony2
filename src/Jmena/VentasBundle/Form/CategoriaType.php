<?php

namespace Jmena\VentasBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CategoriaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('descripcion', null , array ( 'label' => 'Descripción' ) )
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Jmena\VentasBundle\Entity\Categoria'
        ));
    }

    public function getName()
    {
        return 'jmena_ventasbundle_categoriatype';
    }
}
