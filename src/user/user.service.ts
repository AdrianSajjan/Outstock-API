import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { from, map, Observable, switchMap } from 'rxjs';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { Role } from '../shared/enum';
import { AuthService } from '../shared/service';
import { Payload, Tokens } from '../shared/interface';
import { User, UserDocument } from './schema/user.schema';
import { AddAddressData, CreateUserData, UserCredentialsData } from './data-access';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private authService: AuthService) {}

  login(userCredentialsData: UserCredentialsData): Observable<Tokens> {
    const { emailAddress, password } = userCredentialsData;
    return this.getUserByEmail(emailAddress).pipe(
      switchMap((user) => {
        if (!user) throw new ForbiddenException('Provided credentials are not valid');
        return this.authService.compare(password, user.password).pipe(
          switchMap((match) => {
            if (!match) throw new ForbiddenException('Provided credentials are not valid');
            return from(this.authService.createAuthenticationTokens({ id: user._id, role: Role.User })).pipe(
              switchMap((tokens) => {
                user.whitelistedRefreshTokens.push(tokens.refreshToken);
                return from(user.save()).pipe(map(() => tokens));
              }),
            );
          }),
        );
      }),
    );
  }

  register(createUserData: CreateUserData): Observable<Tokens> {
    const { password, emailAddress, phoneNumber, firstName, lastName } = createUserData;
    return this.getUserByEmail(emailAddress).pipe(
      switchMap((exists) => {
        if (exists)
          throw new BadRequestException([{ field: 'emailAddress', error: 'Email is already in use' }], 'One or more fields are invalid');
        return this.authService.hash(password).pipe(
          switchMap((hash) =>
            from(this.userModel.create({ emailAddress, phoneNumber, firstName, lastName, password: hash })).pipe(
              switchMap((user) =>
                from(this.authService.createAuthenticationTokens({ id: user._id, role: Role.User })).pipe(
                  switchMap((tokens) => {
                    user.whitelistedRefreshTokens.push(tokens.refreshToken);
                    return from(user.save()).pipe(map(() => tokens));
                  }),
                ),
              ),
            ),
          ),
        );
      }),
    );
  }

  refreshTokens(payload: Payload, refreshToken: string): Observable<Tokens> {
    return from(this.userModel.findOne({ _id: payload.id, whitelistedRefreshTokens: refreshToken })).pipe(
      switchMap((user) => {
        if (!user) throw new UnauthorizedException('Session expired or not valid');
        return from(this.authService.createAuthenticationTokens(payload)).pipe(
          switchMap((tokens) => {
            const index = user.whitelistedRefreshTokens.findIndex((token) => token === refreshToken);
            if (index !== -1) user.whitelistedRefreshTokens.splice(index, 1);
            user.whitelistedRefreshTokens.push(tokens.refreshToken);
            return from(user.save()).pipe(map(() => tokens));
          }),
        );
      }),
    );
  }

  logout(id: string, refreshToken: string): Observable<any> {
    return from(this.userModel.findOne({ _id: id, whitelistedRefreshTokens: refreshToken })).pipe(
      switchMap((user) => {
        const index = user.whitelistedRefreshTokens.findIndex((token) => token === refreshToken);
        if (index !== -1) user.whitelistedRefreshTokens.splice(index, 1);
        return from(user.save()).pipe(map(() => ({ message: 'User has been logged out' })));
      }),
    );
  }

  logoutAll(id: string): Observable<any> {
    return from(this.userModel.findByIdAndUpdate(id, { $set: { whitelistedRefreshTokens: [] } })).pipe(
      map(() => ({ message: 'User has been logged out' })),
    );
  }

  addAddress(id: string, addressData: AddAddressData): Observable<UserDocument> {
    return this.getUserByID(id).pipe(
      switchMap((user) => {
        if (!user.address) user.address = addressData;
        user.addresses.push(addressData);
        return from(user.save());
      }),
    );
  }

  changeAddress(id: string, address: string): Observable<UserDocument> {
    return this.getUserByID(id).pipe(
      switchMap((user) => {
        const index = user.addresses.findIndex((a) => a._id === address);
        if (index === -1) throw new NotFoundException("The selected address doesn't exist");
        user.address = user.addresses[index];
        return from(user.save());
      }),
    );
  }

  deleteAddress(id: string, address: string): Observable<UserDocument> {
    return this.getUserByID(id).pipe(
      switchMap((user) => {
        const index = user.addresses.findIndex((addr) => addr._id === address);
        if (index === -1) throw new NotFoundException("The selected address doesn't exist");
        user.addresses.splice(index, 1);
        if (user.address._id === address) user.address = user.addresses.length ? user.addresses.length[0] : undefined;
        return from(user.save());
      }),
    );
  }

  getUserByID(id: string): Observable<UserDocument> {
    return from(this.userModel.findById(id).select('-password -whitelistedRefreshTokens'));
  }

  getUserByEmail(emailAddress: string): Observable<UserDocument> {
    return from(this.userModel.findOne({ emailAddress }).select('-password -whitelistedRefreshTokens'));
  }
}
