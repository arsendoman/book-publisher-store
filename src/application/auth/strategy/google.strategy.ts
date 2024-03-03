import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-google-oauth20';
import { GoogleAuthOptions } from '../interfaces/google.auth.options';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(googleAuthOptions: GoogleAuthOptions) {
    super({
      clientID: googleAuthOptions.clientID,
      clientSecret: googleAuthOptions.clientSecret,
      callbackURL: googleAuthOptions.callbackURL,
      scope: googleAuthOptions.scope,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
