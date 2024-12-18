
import { AuthService } from './auth.service';
import { Body,Req, Controller, Post, HttpCode, HttpStatus,UseGuards, Patch } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Public } from './public.decorator';
import { UpdateCurrentUserPassword } from './dto/updatecurrentUserPassword.dto';
import { Request } from 'express';


@Controller('api/v1')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() body: SignInDto) {
      return this.authService.signIn(body);
    }


  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Patch('updateMyPassword')
  updatePassword(@Body() body: UpdateCurrentUserPassword,@Req() request: Request):Promise<any> {
    
    return this.authService.updateCurrentUserPassword(body,request);
  }



}
