import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/shared/service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema, collection: 'Admins' }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AuthService],
})
export class AdminModule {}
