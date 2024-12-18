'use strict'

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { IsNotEmpty, IsString ,MaxLength,IsNumber,IsMobilePhone,Matches} from 'class-validator';

// export class SignUpDto extends PartialType(CreateUserDto){

//     @IsNotEmpty()
//     @IsMobilePhone()
//     @Matches(/^\+\d{1,3}\d{7,15}$/, {
//             message: 'Phone number must be in a valid international format (e.g., +1234567890)',
//         })
//     phoneNumber: string;
//     @IsNotEmpty()
//     @IsString()
//     password: string;
//     @IsNumber()
//     // @MaxLength(10, { message: 'Password must not exceed 10 characters' })
//     @IsNotEmpty()
//     age:Number;
// }

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    firstName:string
    @IsNotEmpty()
    @IsMobilePhone()
    @Matches(/^\+\d{1,3}\d{7,15}$/, {
            message: 'Phone number must be in a valid international format (e.g., +1234567890)',
        })
    phoneNumber: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNumber()
    // @MaxLength(10, { message: 'Password must not exceed 10 characters' })
    @IsNotEmpty()
    age:Number;
    
}

