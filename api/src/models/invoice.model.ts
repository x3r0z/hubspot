import {prop, Ref} from '@typegoose/typegoose';
import {UserModel} from "./user.model";

export class InvoiceItem {
    @prop({ required: true })
    item: number;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    quantity: number;

    @prop({ required: true, default: 0 })
    price: number;
}

export class InvoiceModel {
    @prop({ default: () => new Date(new Date().toUTCString()) })
    createdAt?: Date;

    @prop({ default: () => new Date(new Date().toUTCString()) })
    updatedAt?: Date;

    id?: string;

    @prop({ default: true })
    active?: boolean;

    @prop({ ref: UserModel, required: true})
    user: Ref<UserModel>;

    @prop({ required: true })
    companyName: string;

    @prop({ required: true })
    fullName: string;

    @prop({ required: true })
    companyWebsite: string;

    @prop({ required: false })
    companyAddress?: string;

    @prop({ required: false })
    companyCSZ?: string;

    @prop({ required: false })
    companyCountry?: string;

    @prop({ required: true })
    companyPhone: string;

    @prop({ required: true })
    companyEmail: string;

    @prop({ required: true })
    clientCompany: string;

    @prop({ required: true })
    clientName: string;

    @prop({ required: false })
    clientAddress?: string;

    @prop({ required: false })
    clientCSZ?: string;

    @prop({ required: false })
    clientCountry?: string;

    @prop({ required: true })
    invoiceNo: string;

    @prop({ required: true, default: () => new Date(new Date().toUTCString()) })
    invoiceDate: Date;

    @prop({ required: true, default: () => new Date(new Date().toUTCString()) })
    invoiceDueDate: Date;

    @prop({ required: false })
    invoiceNotes: string;

    @prop({ required: true, default: 0 })
    invoiceSubtotal: number;

    @prop({ required: true, default: 0 })
    invoiceTax: number;

    @prop({ required: true, default: 0 })
    invoiceDiscount: number;

    @prop({ required: true, default: 0 })
    invoiceTotal: number;

    @prop({default: [], ref: InvoiceItem, _id: false })
    items: Array<InvoiceItem>;
}
