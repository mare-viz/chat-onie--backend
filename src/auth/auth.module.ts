import { FilesModule } from './../files/files.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret_key',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    FilesModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
