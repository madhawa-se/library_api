import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth-user/auth-user.decorator';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import LoginUserDto from './dto/login-user.dto';
import RegisterUserDto from './dto/register.dto';
import { JwtAuthGuardService } from './jwt-auth-guard/jwt-auth-guard.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,private userService:UserService) {

    }

    @Post('login')
    public async login(@Body() loginUser: LoginUserDto) {
        const user = await this.authService.login(loginUser);
        console.log("result ", user);
        if (!user) {
            throw new HttpException("Invalid credentials", 401);
        }
        const token = await this.authService.genToken(user);
        return {
            token
        };
    }

    @Post('signup')
    public async register(@Body() createUserDto: RegisterUserDto) {
        const result = await this.authService.register(createUserDto);
        return result;
    }

    @UseGuards(JwtAuthGuardService)
    @Get('me')
    public async profile(@AuthUser() authUser,id: number): Promise<any> {
       return await this.userService.getProfile(authUser.id);
    }

}
