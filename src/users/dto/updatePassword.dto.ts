'use strict'



import {IsNotEmpty,IsString } from 'class-validator';

export class UpdateUserPasswordDto {

    @IsNotEmpty()
    password:string
    @IsNotEmpty()
    newPassword:string;
    @IsNotEmpty()
    passwordConfirm:string

 

}
