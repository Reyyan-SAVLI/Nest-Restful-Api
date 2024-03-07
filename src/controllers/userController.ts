import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "src/dataAccess/dtos/createUserDto";
import { UpdateUserDto } from "src/dataAccess/dtos/updateUserDto";
import { UserEntity } from "src/dataAccess/entities/user.entity";
import { UserService } from "src/dataAccess/services/userService";

@Controller('user')
export class UserController{
    constructor( private readonly userService: UserService){}

    @Get()
    async getAll(): Promise<UserEntity[]>{
        return await this.userService.findAll();
    }

    /* @Get()
    async getOne(): Promise<UserEntity>{
        return await this.userService.findOne();
    } */

    @Post()
    async create(@Body("user") userData: CreateUserDto): Promise<UserEntity>{
        return await this.userService.create(userData);
    }

    @Put()
    async update(@Body("user") userData: UpdateUserDto): Promise<UserEntity>{
        return await this.userService.update(userData);
    }

    @Delete(':id')
    async delete(@Param('id') userId: number): Promise<any>{
        return await this.userService.remove(userId);
    }
}