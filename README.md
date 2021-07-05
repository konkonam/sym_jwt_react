# SYMFONY-JWT-REACT

Symfony backend with JWT-Authentication
Frontend with React in Typescript

## Prerequisite
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