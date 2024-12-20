'use strict'

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })

export class User{

    @Prop({ required: false, trim: true })
    firstName?:string;
    @Prop({ required: false, trim: true })
    lastName?:string
    @Prop({ required: false,min: 0, max: 120 })
    age?:number;
    @Prop({ required: true, trim: true })
    password:string;
    @Prop({required:false})
    photo:string;
    @Prop({required:false})
    phoneNumber:string;


}

export const UsersSchema = SchemaFactory.createForClass(User);

