import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  readonly firstName: string;

  @IsString({ message: 'Must be a string' })
  readonly lastName: string;

  @IsString({ message: 'Must be a string' })
  readonly userName: string;

  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @IsString({ message: 'Must be a string' })
  readonly password: string;

  @IsString({ message: 'Must be a string' })
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly avatarURL: string;
}
