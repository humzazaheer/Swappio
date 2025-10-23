import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdEntity } from "./ad.entity.ts";

@Entity('locations')
export class LocationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    slug: string

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => AdEntity, (ad) => ad.location)
    ad: Promise<AdEntity[]>;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}