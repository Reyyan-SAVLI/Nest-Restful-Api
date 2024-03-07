import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { ReLoginUserDto } from "src/dataAccess/dtos/reLoginUserDto";
import { SECRET } from "../config/config";
import { AuthService } from "src/dataAccess/services/authService";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService){}
        

    async use(req: Request & {user?: ReLoginUserDto} & {id?: number}, 
        res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader;
            const decoded = this.jwtService.verify(token,{secret: SECRET});
            const user = await this.authService.findUserWithTokenId(decoded.id);
 
            if (!user) {
                throw new HttpException('User not found ', HttpStatus.UNAUTHORIZED);
            }
            next();
        }   else{
                throw new HttpException('User not found ', HttpStatus.UNAUTHORIZED);
            }
       
    }
    
}