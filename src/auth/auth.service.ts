import { Injectable,UnauthorizedException ,ForbiddenException} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import { User } from 'src/schema/user.schema';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { UpdateCurrentUserPassword } from './dto/updatecurrentUserPassword.dto';

@Injectable()
export class AuthService {

    constructor(private usersService:UsersService,private jwtService: JwtService){ }



    async signUp(body:SignUpDto):Promise<User>{
        return this.usersService.createUser(body);
    }

    async signIn(body:SignInDto):Promise<{ access_token: string,data:User }>{
        const {phoneNumber,password}=body;
        const user=await this.usersService.findByPhoneNumber(phoneNumber);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
          }

        if(!(await await bcrypt.compare(password, user.password))){
            throw new ForbiddenException(
                'Incorrect old password.Please check it again !',
              );
        }

        const payload ={sub:(user as any)._id.toString(),name:user.firstName};
        const accessToken:string = this.jwtService.sign(payload);


        return {access_token:accessToken,data:user}

    }

    async updateCurrentUserPassword(updateCurrentUserPassword:UpdateCurrentUserPassword,request:Request):Promise<any>{


        const token=this.extractTokenFromHeader(request);

        if(!token){
            throw new UnauthorizedException('Authontication token is missing !');
        }


            const payload = this.jwtService.verify(token);
            const user=await this.usersService.findUserById(payload.sub);

            const isOldPasswordValid=await bcrypt.compare(updateCurrentUserPassword.passwordCurrent,user.password);
            if (!isOldPasswordValid) {
                throw new ForbiddenException('Current password is incorrect');
              }

              await this.usersService.updateUser(payload.sub, updateCurrentUserPassword);

    }

    private extractTokenFromHeader(request: Request): string | undefined {
          const [type, token] = request.headers.authorization?.split(' ') ?? [];
          return type === 'Bearer' ? token : undefined;
        }
}
