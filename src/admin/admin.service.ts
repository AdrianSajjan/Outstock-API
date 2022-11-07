import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../shared/service';
import { Admin, AdminDocument } from './schema';
import { Model } from 'mongoose';
import { from, map, Observable, switchMap } from 'rxjs';
import { AdminCredentialsData } from './data-access';
import { Role } from '../shared/enum';
import { Tokens } from '../shared/interface';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>, private authService: AuthService) {}

  login(adminCredentialsData: AdminCredentialsData): Observable<Tokens> {
    const { emailAddress, password } = adminCredentialsData;
    return this.findAdminByEmail(emailAddress).pipe(
      switchMap((admin) => {
        if (!admin) throw new ForbiddenException('Provided credentials are not valid');
        return this.authService.compare(password, admin.password).pipe(
          switchMap((match) => {
            if (!match) throw new ForbiddenException('Provided credentials are not valid');
            return this.authService.createAuthenticationTokens({ id: admin._id, role: Role.Admin }).pipe(
              switchMap((tokens) => {
                return this.authService.hash(tokens.refreshToken).pipe(
                  switchMap((hash) => {
                    admin.hashedRefreshToken = hash;
                    return from(admin.save()).pipe(map(() => tokens));
                  }),
                );
              }),
            );
          }),
        );
      }),
    );
  }

  logout(id: string) {
    return from(this.adminModel.findByIdAndUpdate(id, { $set: { hashedRefreshToken: undefined } })).pipe(
      map(() => ({ message: 'Admin has been logged out successfully' })),
    );
  }

  findAdminByID(id: string) {
    return from(this.adminModel.findById(id));
  }

  findAdminByEmail(emailAddress: string) {
    return from(this.adminModel.findOne({ emailAddress }));
  }

  register(body: any) {
    return this.authService.hash(body.password).pipe(switchMap((hash) => from(this.adminModel.create({ ...body, password: hash }))));
  }
}
