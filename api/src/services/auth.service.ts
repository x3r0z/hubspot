import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcryptjs from 'bcryptjs';
import {RegisterUserDto} from "../dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this._userService.getOne({email: username});
        if (!user) {
            throw new UnauthorizedException()
        }
        const isMatch = await bcryptjs.compare(pass, user.password);

        if (user && isMatch) {
            return {id: user.id, email: user.email, name: user.name};
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
            userId: user.id,
            accessToken: this._jwtService.sign(payload),
        };
    }

    async register(data: RegisterUserDto): Promise<any> {
        let user = await this._userService.getOne({email: data.email});
        if (user) {
            throw new BadRequestException('Email in use');
        }
        const passHash = await this._userService.hashPassword(data.password, 12);
        user = await this._userService.create({
            email: data.email,
            name: data.name,
            active: true,
            password: passHash
        });
        return {name: user.name, email: user.email, id: user.id};
    }
}
