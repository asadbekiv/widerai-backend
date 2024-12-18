import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from '../schema/user.schema';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports:[MongooseModule.forFeature([{name:User.name,schema:UsersSchema}])],
  providers:[UsersService],
  exports:[UsersService]
})
export class UsersModule {}
