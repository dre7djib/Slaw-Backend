import e, { NextFunction } from "express";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthMiddleware {
    constructor(private jwtService: JwtService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
            const decoded = this.jwtService.verifyAsync(token, {secret: jwtConstants.secret} );
            req['user'] = decoded;
            } catch (error) {
                return error;
            }
        } else {
            return
        }
        next();
    }
}