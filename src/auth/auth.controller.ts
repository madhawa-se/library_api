import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import LoginUserDto from './dto/login-user.dto';
import RegisterUserDto from './dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){

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

}
