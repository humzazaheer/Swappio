import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class Categories {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({ nullable: true })
    image: string;
    
    @Column({nullable: false})
    slug: string
    
    @Column({nullable: false})
    level: number
    
    @Column({nullable: true})
    parentId: number

    @Column({ default: true })
    isActive: boolean;
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
    

    
}