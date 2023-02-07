import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import LoginUserDto from 'src/auth/dto/login-user.dto';
import RegisterUserDto from 'src/auth/dto/register.dto';
import { User } from 'src/models/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    async saveUser(registrationData: RegisterUserDto) {
        const user = new User();
        user.email = registrationData.email;
        // user.name = registrationData.name;
        user.password = registrationData.password;
        const savedUser = await this.userRepo.save(user);
        return (savedUser) ? true : false;
    }

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {

    }

    async isAuthentic(loginUser: LoginUserDto) {
        const userFound = await this.userRepo.findOne({ where: { email: loginUser.email } });
        console.log('trace3 ', userFound);
        if (!userFound) {
            return;
        }
        const matchPassword = await userFound.comparePassword(loginUser.password);
        console.log("matchPassword ", matchPassword);
        if (matchPassword) {
            return userFound;
        }
        console.log('trace4 ', matchPassword);
        return;
    }

    async doesUserExist(email: string) {
        const user = await this.userRepo.findOne({
            where: { email }
        });

        if (user) {
            return true;
        } else {
            return false;
        }

    }
}
