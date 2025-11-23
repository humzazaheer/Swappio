import { FindOptionsWhere, Repository } from "typeorm";
import { AdEntity } from "../entity/ad.entity.ts";
import { CategoryEntity } from "../entity/category.entity.ts";
import { LocationEntity } from "../entity/location.entity.ts";
type UpdateAdInput = {
    title?: string;
    description?: string;
    price?: number;
    categoryId?: number;
    locationId?: number;
};
export class adService {
    constructor(private adRepository: Repository<AdEntity>) { }


    async createAd(ad: AdEntity): Promise<AdEntity> {

        const newAd = this.adRepository.create(ad);
        await this.adRepository.save(newAd);
        return newAd;
    }
    async getAllAds(whereParams: FindOptionsWhere<AdEntity> | FindOptionsWhere<AdEntity>[], skip: number, limit: any): Promise<AdEntity[]> {
        return this.adRepository.find({
            where: { ...whereParams },
            relations: ["user", "category", "location"],
            order: { id: "DESC" },
            skip,
            take: limit,
        });
    }

    async getAdById(id: number): Promise<AdEntity | null> {
        return this.adRepository.findOne({
            where: { id },
            relations: ["user", "category", "location"],

        });
    }
    // async updateAd(
    //     id: number,
    //     AdData: Partial<AdEntity>
    // ): Promise<AdEntity | null> {
    //     const ad = await this.getAdById(id);
    //     if (!ad) return null;

    //     this.adRepository.merge(ad, AdData);
    //     await this   .adRepository.save(ad);
    //     return ad;
    // }

    async updateAd(id: number, data: UpdateAdInput): Promise<AdEntity | null> {
        const ad = await this.getAdById(id);
        if (!ad) return null;

        if (data.categoryId) ad.category = { id: data.categoryId } as CategoryEntity;
        if (data.locationId) ad.location = { id: data.locationId } as LocationEntity;

        this.adRepository.merge(ad, data);
        return await this.adRepository.save(ad);
    }


    async deleteAd(id: number): Promise<boolean> {
        const result = await this.adRepository.delete({ id });
        return result.affected !== 0;
    }

}