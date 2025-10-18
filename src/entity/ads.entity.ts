import { Column, CreateDateColumn, Decimal128, Entity, ForeignKey, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('ads')
export class Ads {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    title: string

    @Column({ nullable: false })
    description: string;
    
    @Column({nullable: false})
    price: number
    
    @Column({nullable: false})
    negotiable: boolean
    
    @Column({nullable: true})
    status: boolean

    @Column({ default: true })
    isActive: boolean;
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
       
}