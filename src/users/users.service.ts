import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = Number(process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };
    const createdUser = new this.userModel(userWithHashedPassword);
    return createdUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: string, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUser.password) {
      const saltRounds = Number(process.env.SALTROUNDS);
      updateUser.password = await bcrypt.hash(updateUser.password, saltRounds);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUser },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userModel.findByIdAndDelete(id);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.userModel.findOne({ phoneNumber });

    if (!user) {
      throw new HttpException(
        `User not found with phone number:${phoneNumber}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  // async updatePassword(id:string,body:UpdateUserPasswordDto):Promise<any>{

  //     const saltRounds=Number(process.env.SALTROUNDS);

  //     const {password,passwordConfirm,newPassword}=body;

  //     const hashedPassword=await bcrypt.hash(password,saltRounds);

  //     const isVaildPassword:boolean = await bcrypt.compare(password,passwordCurrent);
  //     if (!isVaildPassword) {
  //       throw new ForbiddenException(
  //         'Incorrect old password.Please check it again !',
  //       );
  //     }

  // }
}
