
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './worker/worker.module';


@Module({
  imports: [WorkerModule, MongooseModule.forRoot('mongodb+srv://user:mouse27870@cluster0.r5aw1km.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
