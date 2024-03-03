import { Module } from '@nestjs/common';
import { BasicAuthModule } from './modules/basic.auth.module';

@Module({
  imports: [BasicAuthModule],
  exports: [BasicAuthModule],
})
export class AuthModule {}
