import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { deleteUserDto } from './dto/deleteUserDto.interface';
import { findUserDto } from './dto/findUserDro.interface';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {

	constructor(private readonly workerService: WorkerService) { }

	@Post()
	async post(@Body() name: findUserDto) {

		return await this.workerService.post(name.login)
	}

	@Get()
	async getLastFind() {
		return this.workerService.getLastFind()
	}

	@Delete()
	async deleteUser(@Body() user: deleteUserDto) {
		return this.workerService.deleteUser(user.login)
	}
}
