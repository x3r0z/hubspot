import {Controller, Get, UseGuards, Request} from '@nestjs/common';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {UserService} from "../services/user.service";

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get('profile')
    getProfile(@Request() req) {
        // console.log(req);
        return req.user;
    }
}
