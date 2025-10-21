import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1760992794721 implements MigrationInterface {
    name = 'Migration1760992794721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ad_categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoriesId" integer, CONSTRAINT "PK_b21c0e1e88c654cd4fb70cce99e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying, "slug" character varying NOT NULL, "level" integer NOT NULL, "parentId" integer, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad_locations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "locationsId" integer, "adsId" integer, CONSTRAINT "PK_2d847f8d1ff225514cc1efdad7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad_images" ("id" SERIAL NOT NULL, "image_url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "adsId" integer, CONSTRAINT "PK_bc5168dc50924c6316e405fd271" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ads" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying, "slug" character varying NOT NULL, "level" integer NOT NULL, "parentId" integer, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "usersId" integer, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ad_categories" ADD CONSTRAINT "FK_400a10d0e1b6f9f024409eeb97b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad_locations" ADD CONSTRAINT "FK_4840448b88a8a896715115daa5a" FOREIGN KEY ("locationsId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad_locations" ADD CONSTRAINT "FK_4482efbab4322db6e5ab2a639ac" FOREIGN KEY ("adsId") REFERENCES "ads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad_images" ADD CONSTRAINT "FK_879167588ba4acaeb41d1b9e0cb" FOREIGN KEY ("adsId") REFERENCES "ads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_f5343ca2e27c7b68ec6ec79bf8b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_f5343ca2e27c7b68ec6ec79bf8b"`);
        await queryRunner.query(`ALTER TABLE "ad_images" DROP CONSTRAINT "FK_879167588ba4acaeb41d1b9e0cb"`);
        await queryRunner.query(`ALTER TABLE "ad_locations" DROP CONSTRAINT "FK_4482efbab4322db6e5ab2a639ac"`);
        await queryRunner.query(`ALTER TABLE "ad_locations" DROP CONSTRAINT "FK_4840448b88a8a896715115daa5a"`);
        await queryRunner.query(`ALTER TABLE "ad_categories" DROP CONSTRAINT "FK_400a10d0e1b6f9f024409eeb97b"`);
        await queryRunner.query(`DROP TABLE "ads"`);
        await queryRunner.query(`DROP TABLE "ad_images"`);
        await queryRunner.query(`DROP TABLE "ad_locations"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "ad_categories"`);
    }

}
