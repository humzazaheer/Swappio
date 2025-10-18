import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity.ts";
import { AdLocationEntity } from "./ad_location.ts";
import { AdImageEntity } from "./ad_image.entity.ts";

@Entity("ads")
export class AdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  level: number;

  @Column({ nullable: true })
  parentId: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (users) => users.ads)
  users: UserEntity;

  @OneToMany(() => AdLocationEntity, (ad_locations) => ad_locations.ads)
  ad_locations: AdLocationEntity[];

  @OneToMany(() => AdImageEntity, (ad_images) => ad_images.ads)
  ad_images: AdImageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
