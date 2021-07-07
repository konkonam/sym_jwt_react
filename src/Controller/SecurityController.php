<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use Firebase\JWT\JWT;
use App\Security\RefrestTokenGenerator;

use App\Repository\UserRepository;
use App\Repository\RefreshTokenRepository;

class SecurityController extends AbstractController
{
    /**
     * @Route("/auth/login", name="login", methods={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository, UserPasswordEncoderInterface $encoder): Response
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if(!$email || !$password)
        {
            return $this->json([
                'message' => 'please provide information',
            ]);
        }

        $user = $userRepository->findOneBy([
            'email'=>$request->get('email'),
        ]);

        if (!$user || !$encoder->isPasswordValid($user, $request->get('password'))) {
            return $this->json([
                'message' => 'email or password is wrong.',
            ]);
        }

        $payload = [
            "user" => $user->getUsername(),
            "exp"  => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
        ];  

        $refreshToken = RefreshTokenGenerator::generate($user);        
 
         $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
         return $this->json([
             'message' => 'success!',
             'email' => $user->getUsername(),
             'token' => $jwt,
             'refresh-token' => $refreshToken,
         ]);
    }

    /**
     * @Route("/auth/refresh", name="refresh", methods={"POST"})
     */
    public function refresh(Request $request, UserRepository $userRepository, RefreshTokenRepository $refreshTokenRepository): Response
    {
        $refreshTokenRequest = $request.get('token');

        if (!$refreshTokenRequest)
        {
            return $this->json([
                'message' => 'please provide a token',
            ]);
        }

        $refreshToken = $refreshTokenRepository->findOneBy([
            'token' => $refreshTokenRequest,
        ]);

        if (!$refreshToken)
        {
            return $this->json([
                'message' => 'token not found',
            ]);
        }

        // Check if expired if not continue

        $payload = [
            "user" => $user->getUsername(),
            "exp"  => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
        ];

        $newRefreshToken = RefreshTokenGenerator::generate($user);   

        $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
        return $this->json([
            'message' => 'success!',
            'email' => $user->getUsername(),
            'token' => $jwt,
            'refresh-token' => $newRefreshToken,
        ]);
    }
}

