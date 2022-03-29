import { Controller,Request, Post, UseGuards } from '@nestjs/common';
import { BullboardService } from './bullboard.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('queue')
export class BullboardController {
    constructor(private authService: BullboardService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
