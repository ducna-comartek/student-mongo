import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BaseAdapter } from '@bull-board/api/dist/src/queueAdapters/base';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BullboardService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}

export const queuePool: Set<Queue> = new Set<Queue>();

export const getBullBoardQueues = (): BaseAdapter[] => {
    return [...queuePool].reduce((acc: BaseAdapter[], val) => {
        acc.push(new BullAdapter(val));
        return acc;
    }, []);
};

