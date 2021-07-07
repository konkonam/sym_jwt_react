<?php

namespace App\Security;

use App\Entity\User;
use App\Entity\RefreshToken;

class RefreshTokenGenerator
{
    private static function generateRandomString()
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

    public static function generate($entityManager, User $user)
    {
        $refreshToken = new RefreshToken();
        $refreshToken->setToken(RefreshTokenGenerator::generateRandomString());
        $refreshToken->setOwner($user);
        $refreshToken->setUsed(false);
        $refreshToken->setCreated(new \DateTime());
        $refreshToken->setExpires((new \DateTime())->modify('+60 min'));
        $entityManager->persist($refreshToken);
        $entityManager->flush();

        return $refreshToken->getToken();
    }
}