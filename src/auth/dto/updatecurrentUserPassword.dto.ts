'use strict'

import { IsNotEmpty, IsString } from "class-validator"

export class UpdateCurrentUserPassword {

    @IsNotEmpty()
    @IsString()
    passwordCurrent:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsNotEmpty()
    @IsString()
    passwordConfirm:string;


}