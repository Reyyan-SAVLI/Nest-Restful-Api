import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUserDto';
import { error } from 'console';
import { UpdateUserDto } from '../dtos/updateUserDto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}
 
    findAll(): Promise<UserEntity[]>{
      return this.userRepository.find();
    }

    findOne(id: number): Promise<UserEntity>{
      return this.userRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void>{
      await this.userRepository.delete({id});  
    }

    async create(dto: CreateUserDto): Promise<UserEntity>{
        const {email} = dto;
        const qb = this.userRepository
        .createQueryBuilder("users")
        .where("users.email = :email", {email});
        const existUser = qb.getOne();

        if(existUser){
            console.log('Kayıt var.');
            throw error;
        }

        const newUser = new UserEntity();
        newUser.firstName = dto.firstName;
        newUser.lastName = dto.lastName;
        newUser.email = dto.email;
        newUser.password = dto.password;

        return await this.userRepository.save(newUser);

    }

    async update(dto: UpdateUserDto): Promise<UserEntity>{
        const toUpdate = await this.findOne(dto.id);
        delete toUpdate.password;

        const updated = Object.assign(toUpdate,dto);
        return await this.userRepository.save(updated);
    }
}
