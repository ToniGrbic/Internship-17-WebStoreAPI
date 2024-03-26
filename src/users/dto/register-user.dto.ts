import { PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends PartialType(LoginUserDto) {
  name: string;
}
