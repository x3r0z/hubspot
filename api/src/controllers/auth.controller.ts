import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {LocalAuthGuard} from "../guards/local-auth.guard";
import {LoginUserDto, RegisterUserDto} from "../dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() data: LoginUserDto, @Request() req) {
        return this._authService.login(req.user);
    }

    @Post('register')
    async register(@Body() data: RegisterUserDto) {
        return this._authService.register(data);
    }
}
