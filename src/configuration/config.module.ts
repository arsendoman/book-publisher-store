import { DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';

export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
