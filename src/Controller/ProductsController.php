<?php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProductsController extends AbstractController
{
    /**
     * @Route("/api/products", name="products")
     */
    public function products(SerializerInterface $serializer): Response
    {
        $products = $this->getDoctrine()
            ->getRepository(Product::class)
            ->findAll();

        if (!$products)
        {
            return $this->json([
                'message' => 'no products found',
            ]);
        }

        return new Response(
            $serializer->serialize($products, 'json'),
            Response::HTTP_OK,
            ['Content-Type', 'application/json']
        );
    }

    /**
     * @Route("/api/product/{id}", name="product")
     */
    public function product(int $id, SerializerInterface $serializer): Response
    {
        $product = $this->getDoctrine()
            ->getRepository(Product::class)
            ->find($id);

        if ($product)
        {
            return $this->json([
                'message' => 'no product found for' . $id,
            ]);
        }

        return new Response(
            $serializer->serialize($product, 'json'),
            Response::HTTP_OK,
            ['Content-Type', 'application/json']
        );
    }
}
