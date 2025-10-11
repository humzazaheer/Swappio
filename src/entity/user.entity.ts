import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { userRoles, userGender } from "../enum/user.enum.ts";

@Entity({ name: "users" })
export class UserEntity {
@PrimaryGeneratedColumn()
id: number;

@Column({ nullable: false })
firstName: string;

@Column({ nullable: false })
lastName: string;

@Column({ nullable: false, unique: true})
email: string;

@Column({ nullable: false })
password: string;

@Column({ type: "enum", enum: userRoles, default: userRoles.USER })
role: userRoles;

@Column({ nullable: false })
address: string;

@Column({ nullable: false })
phone: string;

@Column({ type: "enum", enum: userGender, default: userGender.NOT_SPECIFIED})
gender: userGender;

@Column({ nullable: true })
profile_image: string;

@Column({ default: false })
isVerified: boolean;

@Column({ default: true })
isActive: boolean;

@Column({ nullable: true, default: null })
otp: string;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
}

