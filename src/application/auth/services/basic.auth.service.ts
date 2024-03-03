import { AuthService } from './auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthResponseDto } from '../../dtos/response/auth/auth.response.dto';
import { AuthLoginDto } from '../../dtos/request/auth/auth.login.dto';

@Injectable()
export class BasicAuthService extends AuthService {
  public async login(authSignInDto: AuthLoginDto): Promise<AuthResponseDto> {
    const user = await this.dataService.profiles.findByEmail(
      authSignInDto.email,
    );
    console.log(user);
    if (!user) {
      throw new HttpException(
        'user with such email does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !(await this.hashHelper.comparePassword(
        authSignInDto.password,
        user.password,
      ))
    ) {
      throw new HttpException(
        'user with such password does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const jwt = await this.generateJwtToken(user);
    console.log(jwt);
    return {
      token: jwt,
    };
  }
}
