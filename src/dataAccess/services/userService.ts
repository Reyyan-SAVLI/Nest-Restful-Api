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

    findEmail(email: string): Promise<UserEntity>{
      return this.userRepository.findOneBy({email});
    }

    async remove(id: number): Promise<void>{
      await this.userRepository.delete(id);  
    }

    async create(dto: CreateUserDto){
      
        const {email} = dto;
        const qb = await this.userRepository
        .createQueryBuilder("user_entity")
        .where("user_entity.email = :email", {email});
        
        const existUser = await qb.getOne();
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
