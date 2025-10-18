import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity.ts";
import { AdLocationEntity } from "./ad_location.ts";

@Entity('ads')
export class AdEntity {
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


    @OneToMany(() => UserEntity, (users) => users.ads)
    users: UserEntity[];

    @OneToMany(() => AdLocationEntity, (ad_locations) => ad_locations.ads)
    ad_locations : AdLocationEntity[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date




}