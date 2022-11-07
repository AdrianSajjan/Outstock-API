import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { config, Config } from './config';
import { AccessJwtGuard, RolesGuard } from './shared/guard';
import { ErrorValidationPipe } from './shared/pipes';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService<Config>) => ({
        uri: configService.get('database.uri', { infer: true }),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProductModule,
    AdminModule,
    SiteModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ErrorValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AccessJwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
