<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Product;

class ProductFixtures extends Fixture
{
    /**
     * Creates dummy-data
     */
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 100; $i++)
        {
            $product = new Product();
            $product->setName('T-Shirt');
            $product->setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
            $product->setPrice(19.99);
            $manager->persist($product);
        }

        $manager->flush();
    }
}