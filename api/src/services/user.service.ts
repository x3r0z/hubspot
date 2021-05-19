import { Injectable } from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {UserModel} from "../models/user.model";
import * as bcryptjs from 'bcryptjs';
import {ReturnModelType} from "@typegoose/typegoose";
import {Types} from "mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel) private readonly _userModel: ReturnModelType<typeof UserModel>
    ) {
    }

    async get(id: string | Types.ObjectId): Promise<any> {
        id = typeof id === 'string' ? Types.ObjectId(id) : id;
        return await this._userModel.findOne({ _id: id, active: true }).exec();
    }

    async getOne(dto: any): Promise<any> {
        return await this._userModel.findOne(dto).exec();
    }

    async create(dto: any): Promise<any> {
        return await this._userModel.create(dto);
    }

    async update(id: any, dto: any): Promise<any> {
        return await this._userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async delete(id: any): Promise<any> {
        return await this._userModel
            .findByIdAndUpdate(id, { active: false }, { new: true })
            .exec();
    }

    async hashPassword(password: string, saltNumber: number = 24): Promise<string> {
        const salt = await bcryptjs.genSalt(saltNumber);
        return await bcryptjs.hash(password, salt);
    }
}
