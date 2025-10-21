import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity.ts";
import { WishlistEntity } from "./wishlist.entity.ts";
import { LocationEntity } from "./location.entity.ts";
import { CategoryEntity } from "./category.entity.ts";
import { ImageEntity } from "./image.entity.ts";

@Entity("ads")
export class AdEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    slug: string

    @Column({ nullable: false })
    level: number;

    @Column({ nullable: true })
    parentId: number;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => UserEntity, (users) => users.ads)
    users: UserEntity

    @OneToMany(() => WishlistEntity, (wishlist) => wishlist.ads)
    wishlist: WishlistEntity[]

    @ManyToOne(() => LocationEntity, (locations) => locations.ads)
    locations: LocationEntity

    @ManyToOne(() => CategoryEntity, (categories) => categories.ads)
    categories: CategoryEntity

    @OneToMany(() => ImageEntity, (images) => images.ads)
    images: ImageEntity[]



    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
