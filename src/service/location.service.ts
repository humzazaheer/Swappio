import { Repository } from "typeorm";
import { LocationEntity } from "../entity/location.entity.ts";

export class LocationService {
    constructor(private locationRepository: Repository<LocationEntity>) { }


    async createlocation(location: LocationEntity): Promise<LocationEntity> {
        console.log(location);

        const newlocation = this.locationRepository.create(location);
        await this.locationRepository.save(newlocation);
        return newlocation;
    }
    async getAllCategories(): Promise<LocationEntity[]> {
        return this.locationRepository.find();
    }
    async deletelocation(id: number): Promise<boolean> {
        const deletedlocation = await this.locationRepository.delete(id);
        return deletedlocation.affected !== 0
    }


    async getlocationById(id: number): Promise<LocationEntity | null> {
        return this.locationRepository.findOneBy({ id });
    }
    async updatelocation(id: number, locationData: Partial<LocationEntity>): Promise<LocationEntity | null> {
        const location = await this.locationRepository.findOneBy({ id });
        if (!location) return null;

        this.locationRepository.merge(location, locationData);
        await this.locationRepository.save(location);
        return location;
    }

}