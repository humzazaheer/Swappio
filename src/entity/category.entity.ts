import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdCategoryEntity } from "./ad_category.ts";

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

    @Column({ nullable: false })
    level: number

    @Column({ nullable: true })
    parentId: number

    @Column({ default: true })
    isActive: boolean;


    @OneToMany(() => AdCategoryEntity, (ad_categories) => ad_categories.categories)
    ad_categories: AdCategoryEntity[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date




}