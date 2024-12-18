'use strict'



import {IsNotEmpty,IsMobilePhone,MaxLength,Matches } from 'class-validator';

export class SignInDto {

    @IsNotEmpty()
    @IsMobilePhone()
    @Matches(/^\+\d{1,3}\d{7,15}$/, {
        message: 'Phone number must be in a valid international format (e.g., +1234567890)',
    })
    phoneNumber:string;
    
    @IsNotEmpty()
    // @MaxLength(10, { message: 'Password must not exceed 10 characters' })
    password:string;

}
