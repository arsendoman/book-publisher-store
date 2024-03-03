import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data.source.abstract';
import { ProfileResponseDto } from 'src/application/dtos/response/profile/profile.response.dto';
import { ProfileMapperService } from '../../mapping/profile.mapper.service';
import { ProfileDto } from '../../dtos/request/profile/profileDto';
import { RolesService } from '../roles/roles.service';
import { RoleUpdateDto } from '../../dtos/request/profile/profileUpdate.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class ProfileService {
  constructor(
    private dataService: IDataServices,
    private profileServiceMapper: ProfileMapperService,
    private rolesService: RolesService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async getCurrentProfile(userId: string): Promise<ProfileResponseDto> {
    const userProfile = await this.dataService.profiles.findById(userId);
    return await this.profileServiceMapper.mapToDto(userProfile);
  }

  async getAllProfiles(currentUserId: string): Promise<ProfileResponseDto[]> {
    const userProfiles = await this.dataService.profiles.getAllExceptCurrent(
      currentUserId,
    );
    return await this.profileServiceMapper.mapToDtoCollection(userProfiles);
  }

  async deleteCurrentProfile(userId: string) {
    await this.dataService.profiles.delete(userId);
  }

  async updateUserProfile(
    userToUpdateId: string,
    profileUpdateDto: ProfileDto,
  ): Promise<ProfileResponseDto> {
    const currentUser = await this.dataService.profiles.findById(
      userToUpdateId,
    );
    if (currentUser.role.title !== profileUpdateDto.role.title) {
      throw new HttpException(
        'User can not update its role',
        HttpStatus.FORBIDDEN,
      );
    }
    Object.assign(currentUser, profileUpdateDto);
    Object.assign(
      currentUser.role,
      await this.rolesService.findOrCreateRole(profileUpdateDto.role),
    );
    console.log(currentUser);
    const updatedUser = await this.dataService.profiles.updateById(
      userToUpdateId,
      currentUser,
    );

    console.log(updatedUser);

    await this.amqpConnection.publish('user', 'user.updated', {
      content: {
        userId: updatedUser.id,
        favoriteCategories: updatedUser.favoriteCategories,
      },
    });

    return await this.profileServiceMapper.mapToDto(updatedUser);
  }

  async updateUserRole(
    userId: string,
    role: RoleUpdateDto,
  ): Promise<ProfileResponseDto> {
    const userProfile = await this.dataService.profiles.findById(userId);
    Object.assign(
      userProfile.role,
      await this.rolesService.findOrCreateRole(role),
    );
    const updatedUser = await this.dataService.profiles.updateById(
      userId,
      userProfile,
    );
    return await this.profileServiceMapper.mapToDto(updatedUser);
  }
}
