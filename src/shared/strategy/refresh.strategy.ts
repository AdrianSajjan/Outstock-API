import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from '../../config';
import { Payload } from '../interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(configService: ConfigService<Config>) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get('secrets.refresh', { infer: true }),
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}
