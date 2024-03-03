import {
  Controller,
  ValidationPipe,
  UsePipes,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GoogleAuthGuard } from '../../../application/guards/google.auth.guard';
import { AuthService } from '../../../application/auth/services/auth.service';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class GoogleAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req) {
    return this.authService.login(req.user);
  }
}
