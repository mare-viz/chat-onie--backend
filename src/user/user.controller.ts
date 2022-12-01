import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
// import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(): Promise<User[]> {
    return this.userService.getUser();
  }

  @Get('/me')
  getMe(@Req() req: Request) {
    return this.userService.getMe(req);
  }

  // @Get('/:userId')
  // getUserById(@Param('userId') userId: number): Promise<User> {
  //   return this.userService.getUserById(userId);
  // }

  @Get('/:userName')
  getUserByUserName(@Param('userName') userName: string): Promise<User> {
    return this.userService.getUserByUserName(userName);
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // createUser(
  //   @Body() dto: CreateUserDto,
  //   @UploadedFile() image: Express.Multer.File,
  // ) {
  //   return this.userService.createUser(dto, image);
  // }

  @Patch('/:userId')
  updateUser(
    @Param('userId') userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(userId, dto);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: number): Promise<DeleteResult> {
    return this.userService.deleteUser(userId);
  }
}
