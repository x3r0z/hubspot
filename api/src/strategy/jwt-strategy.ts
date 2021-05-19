import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'l0ip6bLulK4x2W1nPOmTAR8LqgktdA9YyQHPsUS0IYb2YragTn4rb3LJFG8O2dR'
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
