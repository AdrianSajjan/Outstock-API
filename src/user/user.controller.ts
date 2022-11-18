import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Config } from '../config';
import { CurrentUser, Public } from '../shared/decorator';
import { RefreshJwtGuard } from '../shared/guard';
import { ResponseMessage, Session, Tokens, UserPayload } from '../shared/interface';
import { AddAddressData, CreateUserData, UserCredentialsData } from './data-access';
import { UserDocument } from './schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService<Config>) {}

  @Get('auth')
  authenticate(@CurrentUser() user: UserPayload): Observable<UserDocument> {
    return this.userService.getUserByID(user.id);
  }

  @Public()
  @Post('auth/login')
  login(@Body() userCredentialsData: UserCredentialsData): Observable<Session> {
    return this.userService.login(userCredentialsData);
  }

  @Public()
  @Post('auth/register')
  register(@Body() createUserData: CreateUserData): Observable<Session> {
    return this.userService.register(createUserData);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('auth/oauth2')
  refresh(@CurrentUser() user: UserPayload, @Body('refreshToken') refreshToken: string): Observable<Tokens> {
    return this.userService.refreshTokens({ id: user.id, role: user.role }, refreshToken);
  }

  @Post('auth/logout')
  logout(@CurrentUser() user: UserPayload, @Body('refreshToken') refreshToken: string): Observable<ResponseMessage> {
    return this.userService.logout(user.id, refreshToken);
  }

  @Get('auth/logout-all')
  logoutAll(@CurrentUser() user: UserPayload): Observable<ResponseMessage> {
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

  @Get('/payment/key')
  fetchPaymentPublicKey() {
    const razorpayKey = this.configService.get('razorpay.keyID', { infer: true });
    return { key: razorpayKey };
  }
}
