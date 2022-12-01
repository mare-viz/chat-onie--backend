import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async getMe(headers: any) {
    const token = headers.token;

    if (!token) {
      throw new UnauthorizedException();
    }

    console.log(token.toString());

    const id = await this.jwtService.decode(token.toString())['id'];
    const user = await this.userService.getUserById(id);
    const { password, ...UserData } = user;
    return { ...UserData };
  }
}
