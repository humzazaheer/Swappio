import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AdEntity } from "./ad.entity.ts";

@Entity("ad_images")
export class AdImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  image_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => AdEntity, (ad) => ad.adImage)
  ad: Promise<AdEntity>;
}
