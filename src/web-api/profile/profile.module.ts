import { Module } from '@nestjs/common';
import { ProfileService } from '../../application/services/profiles/profiles.service';
import { ProfileController } from './profiles.controller';
import { DataServiceModule } from 'src/dataservices/data-service.module';
import { ProfileMapperService } from '../../application/mapping/profile.mapper.service';
import { RolesService } from '../../application/services/roles/roles.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    DataServiceModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'users',
          type: 'topic',
        },
      ],
      uri: 'amqp://quest:quest@rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, RolesService, ProfileMapperService],
})
export class ProfileModule {}
