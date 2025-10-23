import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity.ts";
import { WishlistEntity } from "./wishlist.entity.ts";
import { LocationEntity } from "./location.entity.ts";
import { CategoryEntity } from "./category.entity.ts";
import { AdImageEntity } from "./ad_image.entity.ts";

@Entity("ads")
export class AdEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    negotiable: boolean;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => UserEntity, (user) => user.ad)
    user: UserEntity

    @OneToMany(() => WishlistEntity, (wishlist) => wishlist.ad)
    wishlist: WishlistEntity[]

    @ManyToOne(() => LocationEntity, (location) => location.ad)
    location: LocationEntity

    @ManyToOne(() => CategoryEntity, (category) => category.ad)
    category: CategoryEntity

    @OneToMany(() => AdImageEntity, (adImage) => adImage.ad)
    adImage: AdImageEntity[]



    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
