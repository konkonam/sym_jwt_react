<?php

namespace App\Security;

use App\Entity\User;
use App\Entity\RefreshToken;

/**
 * Class RefreshTokenGenerator
 * 
 * Easier usage of refreshToken
 */
class RefreshTokenGenerator
{
    /**
     * Generates a random string based on the characters provided with a fixed length of 256
     */
    private static function generateRandomString()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        for ($i = 0; $i < 256; $i++)
        {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }

    /**
     * Creates the actual refreshToken using the generateRandomString() function an adds it to the database
     */
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