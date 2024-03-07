import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserService } from './userService';
import { LoginUserDto } from '../dtos/loginUserDto';
import * as argon2 from 'argon2'; 
import { RegisterUserDto } from '../dtos/registerUserDto';
import { ReLoginUserDto } from '../dtos/reLoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { PRIVATEKEY, SECRET } from 'src/business/config/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}
    generateToken(user: UserEntity): string{
        const token = this.jwtService.sign(
            {id: user.id, email: user.email},
            {secret: SECRET, privateKey: PRIVATEKEY}
        );
        return token;
    }
    async login(loginUserDto: LoginUserDto): Promise<ReLoginUserDto>{
        const user = await this.userService.findEmail(loginUserDto.email);
        if (!user) {
            const errors = { email: 'Email not found'};
            throw new HttpException({
                message: "Login failed",
                errors
            },
            HttpStatus.BAD_REQUEST);
        }
        if (await argon2.verify(user.password, loginUserDto.password)){
            const result = new ReLoginUserDto();
            result.id = user.id; 
            result.email = user.email;
            result.token = this.generateToken(user);

            return result;
        }
        const errors = { email: 'Email or Password is wrong'};
            throw new HttpException({
                message: "Login failed",
                errors
            },
            HttpStatus.BAD_REQUEST);
    }
    
    
    async register(registerUserDto: RegisterUserDto): Promise<RegisterUserDto>{
        const createUserDto = new CreateUserDto();
        createUserDto.email = registerUserDto.email;
        createUserDto.firstName = registerUserDto.firstName;
        createUserDto.lastName = registerUserDto.lastName;
        createUserDto.password = registerUserDto.password;
        const user = this.userService.create(createUserDto);
        
        return registerUserDto;
    }

    async findUserWithTokenId(id: number): Promise<ReLoginUserDto>{
        const user = await this.userService.findOne(id);
        if (!user) {
            const errors = { user: 'User not found'};
            throw new HttpException({errors},401);
        }
        const result = new ReLoginUserDto();
        result.id = user.id; 
        result.email = user.email;
        result.token = this.generateToken(user);
        return result;
    }
}
