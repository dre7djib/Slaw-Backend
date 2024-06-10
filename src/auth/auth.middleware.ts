import e, { NextFunction } from "express";
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AuthMiddleware {
    constructor(private jwtService: JwtService) {}
    private readonly logger = new Logger(AuthMiddleware.name);

    async use(req: Request, res: Response, next: NextFunction) {
        this.logger.log('Checking if user is authenticated');
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
            const decoded = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
            req['user'] = decoded;
            } catch (error) {
                throw new Error('Invalid token');
            }
        } else {
            return
        }
        next();
    }
}