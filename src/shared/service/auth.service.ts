import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { from, zip, map, Observable } from 'rxjs';
import { Config } from '../../config';
import { Payload, Tokens } from '../interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService<Config>) {}

  createAuthenticationTokens(payload: Payload): Observable<Tokens> {
    return zip(this.createAccessToken(payload), this.createRefreshToken(payload)).pipe(
      map(([accessToken, refreshToken]) => ({ accessToken, refreshToken })),
    );
  }

  private createRefreshToken(payload: Payload): Observable<string> {
    return from(
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('secrets.refresh', { infer: true }),
        expiresIn: '7d',
      }),
    );
  }

  private createAccessToken(payload: Payload): Observable<string> {
    return from(
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('secrets.access', { infer: true }),
        expiresIn: '10s',
      }),
    );
  }

  hash(plaintext: string): Observable<string> {
    return from(bcrypt.hash(plaintext, 10));
  }

  compare(plaintext: string, hash: string): Observable<boolean> {
    return from(bcrypt.compare(plaintext, hash));
  }
}
