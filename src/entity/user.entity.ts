import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { userRoles, userGender } from "../enum/user.enum.ts";
import { AdEntity } from "./ad.entity.ts";
import { Exclude } from "class-transformer";


@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false, unique: true })
    email: string;


    @Column({ nullable: false })
    @Exclude()
    password: string;

    @Column({ type: "enum", enum: userRoles, default: userRoles.USER })
    role: userRoles;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ type: "enum", enum: userGender, default: userGender.NOT_SPECIFIED })
    gender: userGender;

    @Column({ nullable: true })
    profile_image: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: "varchar", nullable: true, default: null })
    otp: string | null;


    @Column({ type: "timestamp", nullable: true, default: null })
    otpValidTill: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => AdEntity, ad => ad.user)
    ads: Promise<AdEntity[]>;
}

