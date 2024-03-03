import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { jwtConstants } from 'src/application/constants/jwt.constants';
import { RequestInterface } from 'src/application/auth/types/request.auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: RequestInterface, res: Response, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(2213);
    if (!token) {
      req.user = null;
      next();
      return;
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    if (!payload || !payload.id) {
      req.user = null;
      next();

      return;
    }

    req.user = payload;
    next();
  }
}
