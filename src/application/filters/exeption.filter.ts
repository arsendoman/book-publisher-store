import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '../../configuration/config.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception);

    response.status(status).json({
      error: {
        status: status,
        error: exception.name,
        message: exception.message,
        timestamp: new Date().toISOString(),
        ...(this.configService.get('ENV') === 'DEVELOPMENT'
          ? { stacktrace: exception.stack }
          : {}),
      },
      request: {
        route: request.url,
        method: request.method,
      },
    });
  }
}
