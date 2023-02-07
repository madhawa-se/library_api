import { Injectable } from '@nestjs/common';
import LoginUserDto from 'src/auth/dto/login-user.dto';
import RegisterUserDto from 'src/auth/dto/register.dto';
import { User } from 'src/models/User.entity';
import { JwtStrategyService } from '../jwt-strategy/jwt-strategy.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService:UserService,private jwtService:JwtService){

    }

    async login(loginUser: LoginUserDto) {
        const authUser = await this.userService.isAuthentic(loginUser);
        return authUser;
    }

    async register(registrationData: RegisterUserDto) {
        const userExist = await this.userService.doesUserExist(registrationData.email);
        if (userExist) {
            return { status: false, error: "User already exists" }
        } else {
            const saveResponse = await this.userService.saveUser(registrationData);
            if (saveResponse) {
                return { status: true };
            } else {
                return { status: false };
            }
        }
    }

    async genToken(user: User) {
        const payload = { username: user.email, sub: user.userId };
        const access_token = this.jwtService.sign(payload);
        return access_token;
    }
}
