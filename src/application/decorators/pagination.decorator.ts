import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { IPagination } from '../../core/interfaces/pagination.interface';

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): IPagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    if (!page || page < 0 || !limit || limit < 0) {
      throw new BadRequestException('Invalid pagination params');
    }
    if (limit > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max size is 100',
      );
    }

    const offset = page * limit;
    return { page, limit, offset };
  },
);
