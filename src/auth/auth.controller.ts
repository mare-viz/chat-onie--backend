import { CreateUserDto } from './../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  // @UseInterceptors(FileInterceptor('image'))
  async registration(
    @Body() userDto: CreateUserDto,
    // @UploadedFile() image: Express.Multer.File,
  ) {
    return this.authService.registration(userDto); //, image
  }

  @Get('/me')
  getMe(@Req() req) {
    return this.authService.getMe(req);
  }
}
