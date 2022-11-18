import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const update = async ({ body: { data, id } }: Request, res: Response) => {
    try {
        await prisma.car.update({ data, where: { id } });
        await prisma.$disconnect();
        res.status(200).json({ message: "car updated successfully" });
    } catch (err) {
        await prisma.$disconnect();
        console.error(err);
        res.status(400).json({ err });
    }
};