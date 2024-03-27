import { PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterUserDto extends PartialType(LoginUserDto) {
  @ApiProperty()
  name: string;
}
