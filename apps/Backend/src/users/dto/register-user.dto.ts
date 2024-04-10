import { PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUserDto extends PartialType(LoginUserDto) {
  @ApiProperty()
  @IsString()
  name: string;
}
