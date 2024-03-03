import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/application/auth/services/auth.service';
import { Module } from '@nestjs/common';
import { jwtConstants } from 'src/application/constants/jwt.constants';
import { JwtStrategy } from 'src/application/auth/strategy/jwt.strategy';
import { BasicAuthService } from 'src/application/auth/services/basic.auth.service';
import { BasicAuthController } from '../controllers/basic.auth.controller';
import { DataServiceModule } from '../../../dataservices/data-service.module';
import { PassportModule } from '@nestjs/passport';
import { HashHelper } from '../../../application/auth/helper/hash';
import { ConfigService } from '../../../configuration/config.service';
import { ExtractJwt } from 'passport-jwt';
import { RolesService } from '../../../application/services/roles/roles.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    DataServiceModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user',
          type: 'topic',
        },
      ],
      uri: 'amqp://quest:quest@rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [
    ConfigService,
    {
      inject: [ConfigService],
      provide: JwtStrategy,
      useFactory: (configService: ConfigService) =>
        new JwtStrategy({
          jwtFromRequest: ExtractJwt.fromHeader('authorization'),
          ignoreExpiration: false,
          secretOrKey: configService.get('JWT_SECRET'),
        }),
    },
    HashHelper,
    RolesService,
    {
      provide: AuthService,
      useClass: BasicAuthService,
    },
  ],
  controllers: [BasicAuthController],
})
export class BasicAuthModule {}
