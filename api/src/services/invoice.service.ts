import { Injectable } from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import {InvoiceModel} from "../models/invoice.model";
import {Types} from "mongoose";

@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel(InvoiceModel) private readonly _invoiceModel: ReturnModelType<typeof InvoiceModel>
    ) {
    }

    async get(id: string | Types.ObjectId): Promise<any> {
        id = typeof id === 'string' ? Types.ObjectId(id) : id;
        return await this._invoiceModel.findOne({ _id: id, active: true }).exec();
    }

    async getOne(dto: any): Promise<any> {
        return await this._invoiceModel.findOne(dto).exec();
    }

    async create(dto: any): Promise<any> {
        return await this._invoiceModel.create(dto);
    }

    async update(id: any, dto: any): Promise<any> {
        return await this._invoiceModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async delete(id: any): Promise<any> {
        return await this._invoiceModel
            .findByIdAndUpdate(id, { active: false }, { new: true })
            .exec();
    }

    async getAllFromUser(userId: string): Promise<any> {
        return this._invoiceModel.find({active: true, user: Types.ObjectId(userId)}).sort({createdAt: -1}).exec();
    }
}
