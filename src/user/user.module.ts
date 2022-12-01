import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './../files/files.module';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), FilesModule, JwtModule],
  exports: [UserService],
})
export class UserModule {}
