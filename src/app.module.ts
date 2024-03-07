import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './controllers/demoController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './dataAccess/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'rest_trial',
    entities: [UserEntity],
    synchronize: true,
  }),],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
