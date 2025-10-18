import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdEntity } from "./ad.entity.ts";
import { LocationEntity } from "./locations.entity.ts";

@Entity('ad_locations')
export class AdLocationEntity {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => LocationEntity, (locations) => locations.ad_locations)
    locations: LocationEntity;

    @ManyToOne(() => AdEntity, (ads) => ads.ad_locations)
    ads: AdEntity;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}