import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
        {
        userId: 1,
        username: 'cad',
        password: '123',
        },
        {
        userId: 2,
        username: 'cad1',
        password: '123',
        },
    ];

    async findOne(username: string) {
        return this.users.find(user => user.username === username);
    }
}
