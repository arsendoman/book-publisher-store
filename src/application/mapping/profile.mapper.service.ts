import { MapperService } from './mapper.service';
import { ProfileResponseDto } from '../dtos/response/profile/profile.response.dto';
import { Profile } from '../../core/entities';
import { Injectable } from '@nestjs/common';
import { BookCategoryEnum } from '../../core/enums/book.category.enum';

@Injectable()
export class ProfileMapperService extends MapperService<
  Profile,
  ProfileResponseDto
> {
  async mapToDto(entity: Profile): Promise<ProfileResponseDto> {
    return {
      id: entity.id,
      bio: entity.bio,
      image: entity.image,
      email: entity.email,
      username: entity.username,
      role: {
        id: entity?.role?.id,
        title: entity?.role?.title,
      },
      favoriteCategories: entity.favoriteCategories,
    };
  }
}
