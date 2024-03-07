import { Body, Delete, Get, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "src/dataAccess/dtos/createUserDto";
import { UpdateUserDto } from "src/dataAccess/dtos/updateUserDto";
import { UserEntity } from "src/dataAccess/entities/user.entity";
import { UserService } from "src/dataAccess/services/userService";

export class UserController{
    constructor( private readonly userService: UserService){}

    @Get()
    async getAll(): Promise<UserEntity[]>{
        return await this.userService.findAll();
    }

    @Get()
    async getOne(): Promise<UserEntity>{
        return await this.userService.findOne();
    }

    @Post()
    async create(@Body("user") userData: CreateUserDto): Promise<UserEntity>{
        return await this.userService.create(userData);
    }

    @Put()
    async update(@Body("user") userData: UpdateUserDto): Promise<UserEntity>{
        return await this.userService.update(userData);
    }

    @Delete()
    async delete(): Promise<any>{
        return await this.userService.delete();
    }
}