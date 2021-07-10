<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210708213048 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(512) DEFAULT NULL)');
        $this->addSql('DROP INDEX IDX_C74F21957E3C61F9');
        $this->addSql('CREATE TEMPORARY TABLE __temp__refresh_token AS SELECT id, owner_id, used, token, created, expires FROM refresh_token');
        $this->addSql('DROP TABLE refresh_token');
        $this->addSql('CREATE TABLE refresh_token (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, owner_id INTEGER NOT NULL, used BOOLEAN NOT NULL, token VARCHAR(256) NOT NULL COLLATE BINARY, created DATETIME NOT NULL, expires DATETIME NOT NULL, CONSTRAINT FK_C74F21957E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO refresh_token (id, owner_id, used, token, created, expires) SELECT id, owner_id, used, token, created, expires FROM __temp__refresh_token');
        $this->addSql('DROP TABLE __temp__refresh_token');
        $this->addSql('CREATE INDEX IDX_C74F21957E3C61F9 ON refresh_token (owner_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP INDEX IDX_C74F21957E3C61F9');
        $this->addSql('CREATE TEMPORARY TABLE __temp__refresh_token AS SELECT id, owner_id, token, used, created, expires FROM refresh_token');
        $this->addSql('DROP TABLE refresh_token');
        $this->addSql('CREATE TABLE refresh_token (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, owner_id INTEGER NOT NULL, token VARCHAR(256) NOT NULL, used BOOLEAN NOT NULL, created DATETIME NOT NULL, expires DATETIME NOT NULL)');
        $this->addSql('INSERT INTO refresh_token (id, owner_id, token, used, created, expires) SELECT id, owner_id, token, used, created, expires FROM __temp__refresh_token');
        $this->addSql('DROP TABLE __temp__refresh_token');
        $this->addSql('CREATE INDEX IDX_C74F21957E3C61F9 ON refresh_token (owner_id)');
    }
}
