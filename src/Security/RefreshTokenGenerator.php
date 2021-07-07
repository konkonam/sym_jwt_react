<?php

namespace App\Security;

use App\Entity\User;
use App\Entity\RefreshToken;

class RefrestTokenGenerator
{
    private function generateRandomString()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        for ($i = 0; $i < 256; $i++)
        {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }

    public static function generate(User $user)
    {
        $refreshToken = new RefreshToken();
        $refreshToken->setToken(RefrestTokenGenerator::generate());
        $refreshToken->setOwner($user);
        $refreshToken->setUsed(false);
        $refreshToken->setCreated(new \DateTime());
        $refreshToken->setExpires((new \DateTime())->modify('+60 min'));
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($refreshToken);
        $entityManager->flush();

        return $refreshToken->getToken();
    }
}