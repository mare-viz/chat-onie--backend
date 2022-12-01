import { IsEmail, IsString } from 'class-validator';

export class AuthUserDto {
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @IsString({ message: 'Must be a string' })
  readonly password: string;
}
