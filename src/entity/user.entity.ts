import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

enum userRoles {
  ADMIN = "admin",
  USER = "user",
}

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
phone: number;

@Column({ nullable: false })
gender: string;

@Column({ nullable: false })
profile_image: string;

@Column({ default: false })
isVerified: boolean;

@Column({ default: false})
isActive: boolean;

@Column()
otp: number;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
}

