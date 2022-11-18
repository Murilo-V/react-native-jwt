import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const exclude = async (req: Request, res: Response) => {
    try {
        await prisma.car.delete({ where: { id: Number(req.params.id) } });
        await prisma.$disconnect();
        res.status(200).json({ message: "car deleted successfully" });
    } catch (err) {
        await prisma.$disconnect();
        console.error(err);
        res.status(400).json({ err });
    }
};