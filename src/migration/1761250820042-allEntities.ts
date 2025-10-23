import { MigrationInterface, QueryRunner } from "typeorm";

export class AllEntities1761250820042 implements MigrationInterface {
    name = 'AllEntities1761250820042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying, "slug" character varying NOT NULL, "parentId" integer, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad_images" ("id" SERIAL NOT NULL, "image_url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "adId" integer, CONSTRAINT "PK_bc5168dc50924c6316e405fd271" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ads" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "negotiable" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "locationId" integer, "categoryId" integer, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "adId" integer, CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otpValidTill"`);
        await queryRunner.query(`ALTER TABLE "ad_images" ADD CONSTRAINT "FK_ae25ba8daeffd0679d961582389" FOREIGN KEY ("adId") REFERENCES "ads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_e72da72588dc5b91427a9adda71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_305be1804b7867ecaee4b3f1836" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_a41fea69f8e459557f6f7fdb5f3" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_25290c879ff035ac0ed924f7eb5" FOREIGN KEY ("adId") REFERENCES "ads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_25290c879ff035ac0ed924f7eb5"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_a41fea69f8e459557f6f7fdb5f3"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_305be1804b7867ecaee4b3f1836"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_e72da72588dc5b91427a9adda71"`);
        await queryRunner.query(`ALTER TABLE "ad_images" DROP CONSTRAINT "FK_ae25ba8daeffd0679d961582389"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "otpValidTill" TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "ads"`);
        await queryRunner.query(`DROP TABLE "ad_images"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "locations"`);
    }

}
