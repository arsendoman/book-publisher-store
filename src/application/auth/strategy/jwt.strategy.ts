import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtAuthOptions } from '../interfaces/jwt.auth.options';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(jwtAuthOptions: JwtAuthOptions) {
    super({
      jwtFromRequest: jwtAuthOptions.jwtFromRequest,
      ignoreExpiration: jwtAuthOptions.ignoreExpiration,
      secretOrKey: jwtAuthOptions.secretOrKey,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    };
  }
}
