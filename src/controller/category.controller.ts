import { Request, Response } from "express";
import { categoryRepository } from "../repository/index.ts";
import { CategoryEntity } from "../entity/category.entity.ts";

export class CategoryController {
    static createCategory = async (req: Request, res: Response) => {
        const { name } = req.body;
        const payload = await categoryRepository.createCategory({ name } as CategoryEntity);
        res.status(200).json({
            mesage: `Category "${name}" created successfully.`,
            category: payload,
        });
    }
    static async getAllCategories(req: Request, res: Response) {
        const users = await categoryRepository.getAllCategories();
        res.json(users);
    }
    static async deleteCategory(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const isDeleted = await categoryRepository.deleteCategory(userId);
        if (!isDeleted) {
            res.status(404).json({ message: "Category not found" });
        } else {
            res.status(200).json({ message: `Category is deleted.` });
        }
    }
    static getCategoryById = async (req: Request, res: Response) => {
        const { id } = req.params;


        const category = await categoryRepository.getCategoryById(Number(id));
        if (!category) {
            return res.status(404).json({ message: "Category not found!" });
        }
        res
            .status(200)
            .json(category);
    };


    static updateCategory = async (req: Request, res: Response) => {
        const userId = Number(req.params.id);



        const user = await categoryRepository.updateCategory(userId, req.body);
        res.status(200).json(user);
    };




}
