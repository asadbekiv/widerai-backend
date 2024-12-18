import { Body,Patch, Controller, Post,Get, Param,HttpStatus,HttpException, Delete,HttpCode } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../schema/user.schema';
import { ValidateObjectIdPipe } from 'src/pipes/vaildate.monodb.objectId';
import { UpdateUserDto } from './dto/updateUser.dto';


@Controller('api/v1')
export class UsersController {
    constructor(private readonly usersService:UsersService){}



    @Post('users')
    async createUser(@Body() body:CreateUserDto):Promise<User>{
        
        return await this.usersService.createUser(body)
    }
    @Get('users')
    async getAllUsers():Promise<User[]>{
        return await this.usersService.findAllUsers();
    }

    @Get('users/:id')
    async getTheUser(@Param("id",ValidateObjectIdPipe) id:string):Promise<User>{

        const findUser=await this.usersService.findUserById(id);
        if(!findUser){
            throw new HttpException('User not found',HttpStatus.BAD_REQUEST)
        }
        
        return findUser;    
    }

    @Patch('users/:id')
    async updateTheUser(
        @Param("id",ValidateObjectIdPipe) id :string,
        @Body() body:UpdateUserDto):Promise<User>{

            
            return await this.usersService.updateUser(id,body)


    }

    
    @Delete('users/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param("id",ValidateObjectIdPipe) id :string):Promise<void>{
        return await this.usersService.deleteUser(id);

    }

    // @Patch('updateMyPassword')
    // async updatePassword(@Body() body:UpdateUserPasswordDto):Promise<any>{

    //     return this.usersService.updatePassword(body);

    // }

    





}
