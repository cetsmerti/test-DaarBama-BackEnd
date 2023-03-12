import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewUser, DataSchema } from './schema/data.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: NewUser.name, schema: DataSchema }]),],
  providers: [WorkerService],
  controllers: [WorkerController]
})
export class WorkerModule { }
