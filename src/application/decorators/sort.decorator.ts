import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ISorting } from 'src/core/interfaces/sorting.interface';
import { Request } from 'express';

export const SortingParams = createParamDecorator(
  (validParams, ctx: ExecutionContext): ISorting => {
    const request: Request = ctx.switchToHttp().getRequest();
    const sort: string = request.header('sort');

    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort?.match(sortPattern)) {
      throw new BadRequestException('Invalid sort order');
    }

    const [property, direction] = sort.split(':');
    if (!validParams.includes(property)) {
      throw new BadRequestException(`Invalid sort property: ${property}`);
    }

    return <ISorting>{ property, direction };
  },
);
