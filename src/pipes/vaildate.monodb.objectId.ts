'use strict'

import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { isMongoId } from 'class-validator';


@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<any>{
    transform(value: any):string {
        if(!isMongoId(value)){
            throw new BadRequestException(`Invalid MongoDB ID: ${value}`);
        }else{
            return value;
        }
    }
}