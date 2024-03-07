import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/userService";
import { AuthMiddleware } from "src/business/middleware/auth.middleware";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../services/authService";


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [TypeOrmModule, UserService],
    providers: [UserService, JwtService, AuthService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(
            {path: 'user', method: RequestMethod.GET},
            {path: 'user', method: RequestMethod.POST},
            {path: 'user', method: RequestMethod.PUT},
            {path: 'user', method: RequestMethod.DELETE},
        );
    }
}