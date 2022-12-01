import { FilesService } from 'src/files/files.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { User } from './../user/entity/user.entity';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private filesService: FilesService,
  ) {}

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return {
      token: token.token,
      id: user.id,
      userName: user.userName,
    };
  }

  async registration(userDto: CreateUserDto) {
    //, image: Express.Multer.File
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    // const fileUrl = await this.filesService.createFile(image);

    const passwordHash = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.createUser({
      ...userDto,
      password: passwordHash,
      // avatarURL: fileUrl,
    });
    const token = await this.generateToken(user);
    return {
      token: token.token,
      id: user.id,
      userName: user.userName,
    };
  }

  async getMe(req) {
    try {
      const token = req.headers.authorization;
      const id = await this.jwtService.decode(token.toString())['id'];
      const user = await this.userService.getUserById(id);
      const newToken = await this.generateToken(user);
      return {
        token: newToken.token,
        id: user.id,
        userName: user.userName,
      };
    } catch (error) {
      return null;
    }
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'incorrect email or pass',
      });
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'incorrect email or pass',
      });
    }

    return user;
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, userName: user.userName };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
