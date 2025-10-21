
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdEntity } from "./ad.entity.ts";
import { UserEntity } from "./user.entity.ts";


@Entity('wishlist')
export class WishlistEntity {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => UserEntity, (users) => users.wishlist)
    users: UserEntity

    @ManyToOne(() => AdEntity, (ads) => ads.wishlist)
    ads: AdEntity

    @CreateDateColumn()
    createdAt: Date

}