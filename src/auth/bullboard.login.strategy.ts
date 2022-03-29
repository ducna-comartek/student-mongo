import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BullboardService } from './bullboard.service';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
@Injectable()
export class LoginStrategy extends PassportStrategy(BasicStrategy, 'login')
{
    constructor(private service: BullboardService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.service.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}