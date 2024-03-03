import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthLoginDto } from 'src/application/dtos/request/auth/auth.login.dto';
import { ProfileDto } from 'src/application/dtos/request/profile/profileDto';
import { AuthResponseDto } from 'src/application/dtos/response/auth/auth.response.dto';
import { AuthService } from '../../../application/auth/services/auth.service';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class BasicAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerDto: ProfileDto): Promise<AuthResponseDto> {
    console.log(23424);
    return this.authService.signUp(registerDto);
  }

  @Post('login')
  findAll(@Body() authDto: AuthLoginDto): Promise<AuthResponseDto> {
    return this.authService.login(authDto);
  }
}
