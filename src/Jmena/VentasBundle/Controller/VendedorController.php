<?php

namespace Jmena\VentasBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Jmena\VentasBundle\Entity\Vendedor;
use Jmena\VentasBundle\Form\VendedorType;

/**
 * Vendedor controller.
 *
 * @Route("/vendedor")
 */
class VendedorController extends Controller
{

    /**
     * Lists all Vendedor entities.
     *
     * @Route("/", name="vendedor")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('JmenaVentasBundle:Vendedor')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Vendedor entity.
     *
     * @Route("/", name="vendedor_create")
     * @Method("POST")
     * @Template("JmenaVentasBundle:Vendedor:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Vendedor();
        $form = $this->createForm(new VendedorType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('vendedor_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Vendedor entity.
     *
     * @Route("/new", name="vendedor_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Vendedor();
        $form   = $this->createForm(new VendedorType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Vendedor entity.
     *
     * @Route("/{id}", name="vendedor_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('JmenaVentasBundle:Vendedor')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Vendedor entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Vendedor entity.
     *
     * @Route("/{id}/edit", name="vendedor_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('JmenaVentasBundle:Vendedor')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Vendedor entity.');
        }

        $editForm = $this->createForm(new VendedorType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Vendedor entity.
     *
     * @Route("/{id}", name="vendedor_update")
     * @Method("PUT")
     * @Template("JmenaVentasBundle:Vendedor:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('JmenaVentasBundle:Vendedor')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Vendedor entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new VendedorType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('vendedor_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Vendedor entity.
     *
     * @Route("/{id}", name="vendedor_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('JmenaVentasBundle:Vendedor')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Vendedor entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('vendedor'));
    }

    /**
     * Creates a form to delete a Vendedor entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
}
