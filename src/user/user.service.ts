import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { FilesService } from 'src/files/files.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private filesService: FilesService,
    private jwtService: JwtService,
  ) {}

  getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getUserByUserName(userName: string): Promise<User> {
    return this.userRepository.findOneBy({ userName });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async getMe(req: Request) {
    try {
      const id = await this.jwtService.decode(
        req.headers.authorization.toString(),
      )['id'];
      const user = await this.getUserById(id);
      return user;
    } catch (error) {
      return null;
    }
  }

  async createUser(dto: CreateUserDto) {
    return this.userRepository.save(dto);
  }

  // affected: 1(true)
  // affected: 0(false)s
  updateUser(id: number, dto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, dto);
  }

  // affected: 1(true)
  // affected: 0(false)
  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
