# SYMFONY-JWT-REACT

Symfony backend with JWT-Authentication\
Frontend with React in Typescript

## Prerequisities
- PHP (developed using version 8.0.7)
- Composer
- symfony - https://symfony.com/download
- yarn

## Installation

### install requirements
- run `composer install`
- run `yarn install`

### create database
- run `php bin/console doctrine:database:create`
- run `php bin/console doctrine:migrations:migrate`
- run `php bin/console doctrine:fixtures:load`

### development
Run three commands each in seperate terminals:
- run `yarn encore dev --watch`
- run `yarn encore dev-server`
- run `symfony server:start`
Access on: https://localhost:8000/\
Create token via:\
`curl -L -X POST 'http://localhost:8000/auth/login?email=test@test.com&password=testpass'`\
Then pass it to your requests in the custom header property `x-access-token`