import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/dataservices/data-service.module';
import { BooksService } from '../../application/services/books/books.service';
import { BookMapperService } from '../../application/mapping/book.mapper.service';
import { BooksController } from './books.controller';
import { BooksFilterMapper } from '../../application/mapping/books.filter.mapper';
import { NotificationPublishedModule } from '../notificationpublisher/notification.published.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'notifications',
          type: 'topic',
        },
      ],
      uri: 'amqp://quest:quest@rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
    DataServiceModule,
    NotificationPublishedModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, BookMapperService, BooksFilterMapper],
})
export class BookModule {}
