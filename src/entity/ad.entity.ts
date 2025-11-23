import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity.ts";
import { CategoryEntity } from "./category.entity.ts";
import { LocationEntity } from "./location.entity.ts";


@Entity({ name: "ads" })
export class AdEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    price: number;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => UserEntity, user => user.ads)
    user: UserEntity;

    @ManyToOne(() => CategoryEntity, category => category.ads)
    category: CategoryEntity;

    @ManyToOne(() => LocationEntity, location => location.ads)
    location: LocationEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

