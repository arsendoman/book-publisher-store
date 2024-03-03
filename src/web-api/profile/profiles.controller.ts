import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Put,
  Request,
  SerializeOptions,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../../database/mongo/schemas';
import { AllowedRoles } from 'src/application/decorators/roles.decorator';
import { PermissionGuard } from 'src/application/guards/auth.guard';
import { RequestInterface } from 'src/application/auth/types/request.auth';
import { ProfileResponseDto } from 'src/application/dtos/response/profile/profile.response.dto';
import { ProfileService } from 'src/application/services/profiles/profiles.service';
import { JwtAuthGuard } from '../../application/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RoleUpdateDto } from '../../application/dtos/request/profile/profileUpdate.dto';
import { ProfileDto } from '../../application/dtos/request/profile/profileDto';

@Controller('profile')
@ApiBearerAuth('JWT-auth')
@SerializeOptions({
  excludePrefixes: ['_'],
})
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter user id to delete',
    type: 'string', // Specify the type as 'string'
  })
  @AllowedRoles(Roles.ADMIN, Roles.CUSTOMER, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  getCurrentProfile(
    @Request() req: RequestInterface,
    @Param('id') id: string,
  ): Promise<ProfileResponseDto> {
    if (req.user.role == 'customer' && req.user.id !== id) {
      throw new HttpException(
        'You do not have a permissions to see this profile',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.profileService.getCurrentProfile(id);
  }

  @Get('all')
  @AllowedRoles(Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  getAllProfilesInfo(
    @Request() req: RequestInterface,
  ): Promise<ProfileResponseDto[]> {
    return this.profileService.getAllProfiles(req.user.id);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter user id to delete',
    type: 'string', // Specify the type as 'string'
  })
  @AllowedRoles(Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  deleteCurrentProfile(@Param('id') id: string) {
    this.profileService.deleteCurrentProfile(id);

    return HttpStatus.NO_CONTENT;
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter user id to update',
    type: 'string', // Specify the type as 'string'
  })
  @AllowedRoles(Roles.ADMIN, Roles.CUSTOMER, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  updateProfileInfo(
    @Body() profileUpdateDto: ProfileDto,
    @Request() req: RequestInterface,
    @Param('id') id: string,
  ): Promise<ProfileResponseDto> {
    if (req.user.role == 'customer' && req.user.id !== id) {
      throw new HttpException(
        'You do not have a permissions to update this profile',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.profileService.updateUserProfile(id, profileUpdateDto);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter user id',
    type: 'string', // Specify the type as 'string'
  })
  @AllowedRoles(Roles.ADMIN, Roles.SUPER_ADMIN)
  updateUserRole(
    @Param('id') id: string, // Specify the type explicitly as 'string'
    @Body() userRole: RoleUpdateDto,
  ): Promise<ProfileResponseDto> {
    return this.profileService.updateUserRole(id, userRole);
  }
}
