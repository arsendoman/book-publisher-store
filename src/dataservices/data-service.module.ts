import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from 'src/database/mongo/mongo-data-services.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServiceModule {}
