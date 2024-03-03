import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from '../../dtos/response/auth/auth.response.dto';

@Injectable()
export class GoogleAuthService extends AuthService {
  public async login(userFromGoogle: any): Promise<AuthResponseDto> {
    const user = await this.dataService.profiles.findByEmail(
      userFromGoogle.email,
    );

    if (!user) {
      throw new HttpException(
        'user with such email does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const jwt = await this.generateJwtToken(user);
    return {
      token: jwt,
    };
  }
}
