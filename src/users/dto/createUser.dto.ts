'use strict'


import {IsNotEmpty, IsNumber,IsOptional,IsString } from 'class-validator';

export class CreateUserDto {



  @IsOptional()
  @IsString()
  firstName?: string;

  
  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  password:string;

  @IsNumber()
  @IsNotEmpty()
  age:Number;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  phoneNumber?:string;
 

}
