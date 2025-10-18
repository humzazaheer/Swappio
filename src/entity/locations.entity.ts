import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdLocationEntity } from "./ad_locations.ts";

@Entity('locations')
export class LocationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    slug: string
    
    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => AdLocationEntity, (ad_locations) => ad_locations.locations)
    ad_locations: AdLocationEntity[];
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
}