import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1762870775319 implements MigrationInterface {
    name = 'Users1762870775319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ads" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "image" character varying, "price" numeric(10,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "categoryId" integer, "locationId" integer, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_e72da72588dc5b91427a9adda71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_a41fea69f8e459557f6f7fdb5f3" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_305be1804b7867ecaee4b3f1836" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_305be1804b7867ecaee4b3f1836"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_a41fea69f8e459557f6f7fdb5f3"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_e72da72588dc5b91427a9adda71"`);
        await queryRunner.query(`DROP TABLE "ads"`);
    }

}
