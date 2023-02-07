import { IsEmail, IsNotEmpty } from 'class-validator';

class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty() name: string;
    @IsNotEmpty() password: string;
}

export default RegisterUserDto;
