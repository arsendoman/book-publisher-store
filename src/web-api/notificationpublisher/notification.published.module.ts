import { Module } from '@nestjs/common';
import { NotificationPublisherService } from '../../application/notification.publisher.service/notification.publisher.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  providers: [NotificationPublisherService],
  exports: [NotificationPublisherService],
})
export class NotificationPublishedModule {}
