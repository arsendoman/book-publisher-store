import { Book } from '../../core/entities';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

//TODO
export class NotificationPublisherService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async createBookPublishedEvent(book: Book) {
    await this.amqpConnection.publish('notifications', 'book-published', {
      title: 'Book Published',
      content: book,
    });
  }
}
