import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "../prismaClient";

export const login = async ({ body: { data } }: Request, res: Response) => {
    try {
        const user = await prisma.admin.findUniqueOrThrow({ where: { user: data.user } });
        if (user.password !== data.password) throw new Error('wrong password');
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: 1800
          });
        await prisma.$disconnect();
        res.status(200).json({ auth: true, token });
    } catch (err: any) {
        await prisma.$disconnect();
        console.error(err);
        res.status(401).json({ error: err.message, auth: false, token: null });
    }
};