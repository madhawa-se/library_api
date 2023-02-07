import { IsEmail, IsNotEmpty } from 'class-validator';

class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty() password: string;
}

export default LoginUserDto;