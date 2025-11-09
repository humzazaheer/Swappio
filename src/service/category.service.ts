import { Repository } from "typeorm";
import { CategoryEntity } from "../entity/category.entity.ts";

export class CategoryService {
    constructor(private categoryRepository: Repository<CategoryEntity>) { }


    async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
        console.log(category);

        const newCategory = this.categoryRepository.create(category);
        await this.categoryRepository.save(newCategory);
        return newCategory;
    }
    async getAllCategories(): Promise<CategoryEntity[]> {
        return this.categoryRepository.find();
    }
    async deleteCategory(id: number): Promise<boolean> {
        const deletedCategory = await this.categoryRepository.delete(id);
        return deletedCategory.affected !== 0
    }


    async getCategoryById(id: number): Promise<CategoryEntity | null> {
        return this.categoryRepository.findOneBy({ id });
    }
    async updateCategory(id: number, categoryData: Partial<CategoryEntity>): Promise<CategoryEntity | null> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) return null;

        this.categoryRepository.merge(category, categoryData);
        await this.categoryRepository.save(category);
        return category;
    }






}