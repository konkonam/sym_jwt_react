<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use Firebase\JWT\JWT;
use App\Security\RefreshTokenGenerator;

use App\Repository\UserRepository;
use App\Repository\RefreshTokenRepository;

/**
 * TODO: fix redundant and shitty code ¯\_(ツ)_/¯
 */
class SecurityController extends AbstractController
{
    /**
     * @Route("/auth/register", name="register", methods={"POST"})
     */
    public function register(Request $request, UserRepository $userRepository, UserPasswordEncoderInterface $encoder): Response
    {
        $email = $request->get('email');
        $password = $request->get('password');

        // Check if data was provided in the request
        if (!$email || !$password)
        {
            return new JsonResponse([
                'message' => 'please provide information'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $registeredUser = $userRepository->findOneBy([
            'email' => $request->get('email'),
        ]);

        // Check if email is already registered
        if($registeredUser)
        {
            return new JsonResponse([
                'message' => 'user already registered'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($encoder->encodePassword($user, $password));
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        $payload = [
            "user" => $user->getUsername(),
            "exp"  => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
        ];  

        $refreshToken = RefreshTokenGenerator::generate($entityManager, $user);        
 
        $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
        return $this->json([
            'message' => 'success!',
            'email' => $user->getUsername(),
            'accessToken' => $jwt,
            'refreshToken' => $refreshToken,
        ]);
    }

    /**
     * @Route("/auth/login", name="login", methods={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository, UserPasswordEncoderInterface $encoder): Response
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (!$email || !$password)
        {
            return new JsonResponse([
                'message' => 'please provide information'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = $userRepository->findOneBy([
            'email' => $request->get('email'),
        ]);

        if (!$user || !$encoder->isPasswordValid($user, $request->get('password'))) {
            return new JsonResponse([
                'message' => 'email or password is wrong.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $payload = [
            "user" => $user->getUsername(),
            "exp"  => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
        ];  

        $entityManager = $this->getDoctrine()->getManager();
        $refreshToken = RefreshTokenGenerator::generate($entityManager, $user);        
 
         $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
         return $this->json([
             'message' => 'success!',
             'email' => $user->getUsername(),
             'accessToken' => $jwt,
             'refreshToken' => $refreshToken,
         ]);
    }

    /**
     * @Route("/auth/refresh", name="refresh", methods={"POST"})
     */
    public function refresh(Request $request, UserRepository $userRepository, RefreshTokenRepository $refreshTokenRepository): Response
    {
        $refreshTokenRequest = $request->get('refresh');

        // Check if token was provided in the request
        if (!$refreshTokenRequest)
        {
            return new JsonResponse([
                'message' => 'please provide a token'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $refreshToken = $refreshTokenRepository->findOneBy([
            'token' => $refreshTokenRequest,
        ]);

        // Check if token was found
        if (!$refreshToken)
        {
            return new JsonResponse([
                'message' => 'token not found'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Check if token is expired
        if ((new \DateTime()) > $refreshToken->getExpires())
        {
            return new JsonResponse([
                'message' => 'token expired'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Check if token is used
        if($refreshToken->getUsed())
        {
            return new JsonResponse([
                'message' => 'token already used'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $refreshToken->setUsed(true);

        $payload = [
            "user" => $refreshToken->getOwner()->getUsername(),
            "exp"  => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
        ];

        $entityManager = $this->getDoctrine()->getManager();
        $newRefreshToken = RefreshTokenGenerator::generate($entityManager, $refreshToken->getOwner());  


        $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
        return $this->json([
            'message' => 'success!',
            'email' => $refreshToken->getOwner()->getUsername(),
            'accessToken' => $jwt,
            'refreshToken' => $refreshToken,
        ]);
    }
}
