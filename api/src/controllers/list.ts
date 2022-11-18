import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const list = async (req: Request, res: Response) => {
    try {
        const cars = await prisma.car.findMany();
        await prisma.$disconnect()
        res.status(200).json({ cars });
    } catch (err) {
        await prisma.$disconnect()
        console.error(err);
        res.status(400).json({ err });
    }
};