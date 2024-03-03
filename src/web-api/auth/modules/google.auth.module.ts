import { AuthService } from 'src/application/auth/services/auth.service';
import { Module } from '@nestjs/common';
import { HashHelper } from 'src/application/auth/helper/hash';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthService } from 'src/application/auth/services/google.auth.service';
import { GoogleAuthController } from '../controllers/google.auth.controller';
import { GoogleStrategy } from 'src/application/auth/strategy/google.strategy';
import { DataServiceModule } from '../../../dataservices/data-service.module';
import { ConfigService } from '../../../configuration/config.service';

@Module({
  imports: [DataServiceModule, PassportModule],
  providers: [
    ConfigService,
    {
      inject: [ConfigService],
      provide: GoogleStrategy,
      useFactory: (configService: ConfigService) =>
        new GoogleStrategy({
          clientID: configService.get('GOOGLE_CLIENT_ID'),
          clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
          callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
          scope: ['email', 'profile'],
        }),
    },
    {
      provide: AuthService,
      useClass: GoogleAuthService,
    },
    HashHelper,
  ],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
