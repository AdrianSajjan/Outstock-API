import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../config';
import { Payload } from '../interface';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor(configService: ConfigService<Config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secrets.access', { infer: true }),
    });
  }

  async validate(payload: Payload) {
    return payload;
  }
}
