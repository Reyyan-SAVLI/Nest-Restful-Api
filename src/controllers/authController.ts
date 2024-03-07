import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/dataAccess/dtos/loginUserDto';
import { RegisterUserDto } from 'src/dataAccess/dtos/registerUserDto';
import { AuthService } from 'src/dataAccess/services/authService';

@Controller("auth")
export class AuthController {
    constructor( private readonly authService: AuthService){}

  @Post("login")
    async login(@Body("login") loginUserDto: LoginUserDto){
        return await this.authService.login(loginUserDto);
    }

  @Post("register")
    async register(@Body("register") registerUserDto: RegisterUserDto){
        return await this.authService.register(registerUserDto);
    }
}
