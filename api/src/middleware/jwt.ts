import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function verifyJWT(req: any, res: any, next: any){
    const token = req.headers['x_access_token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token as string, process.env.JWT_SECRET as string, function(err: any, decoded: any) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      next();
    });
}