
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdEntity } from "./ad.entity.ts";
import { CategoryEntity } from "./category.entity.ts";

@Entity('ad_categories')
export class AdCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => CategoryEntity, (categories) => categories.ad_categories)
    categories: CategoryEntity;


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}