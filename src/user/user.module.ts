import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AccessStrategy, RefreshStrategy } from '../shared/strategy';
import { AuthService } from '../shared/service';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema, collection: 'Users' }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, AccessStrategy, RefreshStrategy],
})
export class UserModule {}
