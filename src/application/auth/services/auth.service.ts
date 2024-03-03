import { IDataServices } from '../../../core/abstracts/data.source.abstract';
import { HashHelper } from '../helper/hash';
import { JwtService } from '@nestjs/jwt';
import { ProfileDto } from '../../dtos/request/profile/profileDto';
import { ProfileResponseDto } from '../../dtos/response/profile/profile.response.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from '../../../core/entities';
import { AuthResponseDto } from '../../dtos/response/auth/auth.response.dto';
import { RolesService } from '../../services/roles/roles.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export abstract class AuthService {
  constructor(
    protected dataService: IDataServices,
    protected hashHelper: HashHelper,
    protected jwtService: JwtService,
    protected rolesService: RolesService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  public async signUp(authSignUpDto: ProfileDto): Promise<AuthResponseDto> {
    const userByEmail = await this.dataService.profiles.findByEmail(
      authSignUpDto.email,
    );

    if (userByEmail) {
      throw new HttpException(
        'user with such email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const profile = new Profile();
    Object.assign(profile, authSignUpDto);

    profile.role = await this.rolesService.findOrCreateRole(authSignUpDto.role);
    profile.password = await this.hashHelper.hashPassword(profile.password);

    const createdProfile = await this.dataService.profiles.create(profile);
    await this.amqpConnection.publish('user', 'user.created', {
      content: {
        userId: createdProfile.id,
        favoriteCategories: createdProfile.favoriteCategories,
      },
    });

    return {
      token: await this.generateJwtToken(createdProfile),
    };
  }

  protected async generateJwtToken(user: Profile): Promise<string> {
    const payload = {
      id: user['_id'],
      email: user.email,
      username: user.username,
      role: (await this.dataService.roles.get(user.role.id)).title,
    };

    return await this.jwtService.signAsync(payload);
  }

  public abstract login(data: any): Promise<AuthResponseDto>;
}
