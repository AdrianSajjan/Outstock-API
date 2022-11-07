import { Body, Controller, Post } from '@nestjs/common';
import { UserPayload } from '../shared/interface';
import { CurrentUser, Public } from '../shared/decorator';
import { AdminService } from './admin.service';
import { AdminCredentialsData } from './data-access';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('login')
  login(@Body() adminCredentialsData: AdminCredentialsData) {
    return this.adminService.login(adminCredentialsData);
  }

  @Public()
  @Post('register')
  register(@Body() body: any) {
    return this.adminService.register(body);
  }

  @Post('logout')
  logout(@CurrentUser() user: UserPayload) {
    return this.adminService.logout(user.id);
  }
}
