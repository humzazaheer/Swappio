import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdEntity } from "./ad.entity.ts";

@Entity('images')
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    image_url: string;

    @ManyToOne(() => AdEntity, (ads) => ads.images)
    ads: AdEntity


    @CreateDateColumn()
    createdAt: Date


}