
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdEntity } from "./ad.entity.ts";
import { UserEntity } from "./user.entity.ts";


@Entity('wishlist')
export class WishlistEntity {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => UserEntity, (user) => user.wishlist)
    user: UserEntity

    @ManyToOne(() => AdEntity, (ad) => ad.wishlist)
    ad: AdEntity

    @CreateDateColumn()
    createdAt: Date

}