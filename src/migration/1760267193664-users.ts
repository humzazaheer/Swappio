import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1760267193664 implements MigrationInterface {
    name = 'Users1760267193664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "otpValidTill" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otpValidTill"`);
    }

}
