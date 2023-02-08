import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuardService } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { Book } from 'src/models/Book.entity';
import { User } from 'src/models/User.entity';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
    constructor(private membersService: MembersService){

    }

    @UseGuards(JwtAuthGuardService)
    @Get('search')
    async search(@Query('name') name?: string): Promise<User[]> {
        return this.membersService.search(name);
    }
}
