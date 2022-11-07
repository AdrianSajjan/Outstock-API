import { Observable } from 'rxjs';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { UserDocument } from './schema';
import { UserService } from './user.service';
import { Public } from '../shared/decorator';
import { CurrentUser } from '../shared/decorator';
import { RefreshJwtGuard } from '../shared/guard';
import { Tokens, UserPayload } from '../shared/interface';
import { AddAddressData, CreateUserData, UserCredentialsData } from './data-access';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('auth')
  authenticate(@CurrentUser() user: UserPayload): Observable<UserDocument> {
    return this.userService.getUserByID(user.id);
  }

  @Public()
  @Post('auth/login')
  login(@Body() userCredentialsData: UserCredentialsData): Observable<Tokens> {
    return this.userService.login(userCredentialsData);
  }

  @Public()
  @Post('auth/register')
  register(@Body() createUserData: CreateUserData): Observable<Tokens> {
    return this.userService.register(createUserData);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('auth/oauth2')
  refresh(@CurrentUser() user: UserPayload, @Body('refreshToken') refreshToken: string): Observable<Tokens> {
    return this.userService.refreshTokens({ id: user.id, role: user.role }, refreshToken);
  }

  @Post('auth/logout')
  logout(@CurrentUser() user: UserPayload, @Body('refreshToken') refreshToken: string): Observable<any> {
    return this.userService.logout(user.id, refreshToken);
  }

  @Get('auth/logout-all')
  logoutAll(@CurrentUser() user: UserPayload): Observable<any> {
    return this.userService.logoutAll(user.id);
  }

  @Get('address/:id')
  changeAddress(@Param('id') id: string, @CurrentUser() user: UserPayload): Observable<UserDocument> {
    return this.userService.changeAddress(user.id, id);
  }

  @Post('address')
  addAddress(@CurrentUser() user: UserPayload, @Body() addressData: AddAddressData): Observable<UserDocument> {
    return this.userService.addAddress(user.id, addressData);
  }

  @Delete('address/:id')
  deleteAddress(@Param('id') id: string, @CurrentUser() user: UserPayload): Observable<UserDocument> {
    return this.userService.deleteAddress(user.id, id);
  }
}
