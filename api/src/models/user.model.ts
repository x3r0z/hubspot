import { prop } from '@typegoose/typegoose';

export class UserModel {
    @prop({ default: () => new Date(new Date().toUTCString()) })
    createdAt?: Date;

    @prop({ default: () => new Date(new Date().toUTCString()) })
    updatedAt?: Date;

    id?: string;

    @prop()
    name: string;

    @prop({ unique: true })
    email: string;

    @prop({ default: true })
    active?: boolean;

    @prop({
        required: true,
        minlength: 8,
    })
    password: string;
}
