import { ProfileService } from './profile.service';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getMe(@Req() req: Request) {
    return this.profileService.getMe(req.headers);
  }
}
