import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import 'dotenv/config'


const DATABASEURL=process.env.DATABASE_URL;




@Module({
  imports: [MongooseModule.forRoot(DATABASEURL), AuthModule,UsersModule],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  
})
export class AppModule {}
