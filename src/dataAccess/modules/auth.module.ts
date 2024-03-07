import { AuthController } from "src/controllers/authController";
import { AuthService } from "../services/authService";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../services/userService";


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService, JwtService, UserService]
})
export class AuthModule{}