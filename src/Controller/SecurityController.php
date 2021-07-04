<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use Firebase\JWT\JWT;

use App\Repository\UserRepository;

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
 
         $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
         return $this->json([
             'message' => 'success!',
             'token' => $jwt,
         ]);
    }
}

/**
 * curl -L -X POST 'http://localhost:8888/public/auth/login?email=test@test.com&password=testpass'
 * 
 * Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6MTYyNTQwNTkxMX0.u4ZszK4ErPIvmmzAnaItpkTo1ccarkWUMRnj9FR3cPQ
 * 
 * curl -L -X GET 'http://localhost:8888/public/api/products' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6MTYyNTQwNTkxMX0.u4ZszK4ErPIvmmzAnaItpkTo1ccarkWUMRnj9FR3cPQ'
 */