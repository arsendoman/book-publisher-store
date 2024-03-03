import { Injectable } from '@nestjs/common';
import { EnvConfig } from '../core/configuration/env.config';
import dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    dotenv.config();
    this.envConfig = this.parseFromEnv();
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  private parseFromEnv(): EnvConfig {
    return {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
      GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      ENV: process.env.ENV,
    };
  }
}
