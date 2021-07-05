<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

use App\Repository\ProductRepository;

class ProductsController extends AbstractController
{
    /**
     * @Route("/api/products", name="products")
     */
    public function products(ProductRepository $productsRepository, SerializerInterface $serializer): Response
    {
        $products = $productsRepository->findAll();

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
    public function product(int $id, ProductRepository $productsRepository, SerializerInterface $serializer): Response
    {
        $product = $productsRepository->find($id);

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
