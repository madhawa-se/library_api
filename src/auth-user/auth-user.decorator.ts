import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserData } from 'src/entities/auth-user-data';

export const AuthUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        let authUser: AuthUserData;
        if (user) {
            authUser = new AuthUserData();
            authUser.id = user._id;
            authUser.name = user.username;
        }
        return authUser;
    },
);