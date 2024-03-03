import { JwtFromRequestFunction } from 'passport-jwt';

export interface JwtAuthOptions {
  jwtFromRequest: JwtFromRequestFunction;
  ignoreExpiration: boolean;
  secretOrKey: string;
}
