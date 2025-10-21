import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdEntity } from "./ad.entity.ts";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: false })
    slug: string

    @Column({ nullable: true, default: null })
    parentId: number

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => AdEntity, (ads) => ads.locations)
    ads: AdEntity[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

