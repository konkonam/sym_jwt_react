<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210710094933 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_C74F21957E3C61F9');
        $this->addSql('CREATE TEMPORARY TABLE __temp__refresh_token AS SELECT id, owner_id, used, token, created, expires FROM refresh_token');
        $this->addSql('DROP TABLE refresh_token');
        $this->addSql('CREATE TABLE refresh_token (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, owner_id INTEGER NOT NULL, used BOOLEAN NOT NULL, token VARCHAR(256) NOT NULL COLLATE BINARY, created DATETIME NOT NULL, expires DATETIME NOT NULL, CONSTRAINT FK_C74F21957E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO refresh_token (id, owner_id, used, token, created, expires) SELECT id, owner_id, used, token, created, expires FROM __temp__refresh_token');
        $this->addSql('DROP TABLE __temp__refresh_token');
        $this->addSql('CREATE INDEX IDX_C74F21957E3C61F9 ON refresh_token (owner_id)');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, email, roles, password, prename, surname, city, postal_code, address, avatar FROM user');
        $this->addSql('DROP TABLE user');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL COLLATE BINARY, roles CLOB NOT NULL COLLATE BINARY --(DC2Type:json)
        , password VARCHAR(255) NOT NULL COLLATE BINARY, city VARCHAR(128) DEFAULT NULL COLLATE BINARY, address VARCHAR(255) DEFAULT NULL COLLATE BINARY, avatar VARCHAR(64) DEFAULT NULL COLLATE BINARY, prename VARCHAR(64) DEFAULT NULL, surname VARCHAR(64) DEFAULT NULL, postal_code VARCHAR(16) DEFAULT NULL)');
        $this->addSql('INSERT INTO user (id, email, roles, password, prename, surname, city, postal_code, address, avatar) SELECT id, email, roles, password, prename, surname, city, postal_code, address, avatar FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_C74F21957E3C61F9');
        $this->addSql('CREATE TEMPORARY TABLE __temp__refresh_token AS SELECT id, owner_id, token, used, created, expires FROM refresh_token');
        $this->addSql('DROP TABLE refresh_token');
        $this->addSql('CREATE TABLE refresh_token (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, owner_id INTEGER NOT NULL, token VARCHAR(256) NOT NULL, used BOOLEAN NOT NULL, created DATETIME NOT NULL, expires DATETIME NOT NULL)');
        $this->addSql('INSERT INTO refresh_token (id, owner_id, token, used, created, expires) SELECT id, owner_id, token, used, created, expires FROM __temp__refresh_token');
        $this->addSql('DROP TABLE __temp__refresh_token');
        $this->addSql('CREATE INDEX IDX_C74F21957E3C61F9 ON refresh_token (owner_id)');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, email, roles, password, prename, surname, city, postal_code, address, avatar FROM "user"');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('CREATE TABLE "user" (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        , password VARCHAR(255) NOT NULL, city VARCHAR(128) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, avatar VARCHAR(64) DEFAULT NULL, prename VARCHAR(64) NOT NULL COLLATE BINARY, surname VARCHAR(64) NOT NULL COLLATE BINARY, postal_code VARCHAR(16) NOT NULL COLLATE BINARY)');
        $this->addSql('INSERT INTO "user" (id, email, roles, password, prename, surname, city, postal_code, address, avatar) SELECT id, email, roles, password, prename, surname, city, postal_code, address, avatar FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
    }
}
