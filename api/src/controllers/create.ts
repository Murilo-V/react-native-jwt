import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const create = async ({ body: { data } }: Request, res: Response) => {
    try {
        await prisma.car.create({ data });
        await prisma.$disconnect();
        res.status(200).json({ message: "car created successfully" });
    } catch (err) {
        await prisma.$disconnect();
        console.error(err);
        res.status(400).json({ error: "it wasn't possible create the car" });
    }
};