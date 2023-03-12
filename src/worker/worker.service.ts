
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { octokit } from 'src/octikit';
import { NewUser, DataDocument } from './schema/data.schema';


@Injectable()
export class WorkerService {

	constructor(@InjectModel(NewUser.name) private model: Model<DataDocument>) { }

	async post(login: string) {

		let user
		await octokit.rest.users.getByUsername({
			username: login
		}).then(data => user = data.data).catch((error: Error) => { throw new HttpException(error.message, HttpStatus.NOT_FOUND) })
		if (!user) {
			throw new HttpException('Что-то пошло не так', HttpStatus.NOT_FOUND)
		}
		user.gists_url = user.gists_url.slice(0, -10);
		user.following_url = user.following_url.slice(0, -10);
		const founUserOnDataBase = await this.model.findOne({ login: user.login }).exec()
		const sliceData = this.slicedata(user)

		if (!founUserOnDataBase) {
			return this.createUser(user)
		}
		return await this.model.findOneAndUpdate({ id: sliceData.login }, sliceData, { new: true })
	}
	async getLastFind() {
		return await this.model.find().exec()
	}
	async deleteUser(login: string) {
		const findUser = await this.model.findOne({ login }).exec()
		if (!findUser) {
			throw new HttpException('Нет такого пользователя', HttpStatus.NOT_FOUND)
		}
		return await this.model.deleteOne({ login: findUser.login })
	}


	async createUser(user) {

		const saveDataDataBase = this.slicedata(user)
		const createNewDataOnDataBase = new this.model(saveDataDataBase)

		return createNewDataOnDataBase.save()
	}
	slicedata(userData) {
		const { login, html_url, following_url, starred_url, created_at, repos_url, avatar_url } = userData
		const slicedata = { login, html_url, following_url, created_at, repos_url, avatar_url, starred_url }
		slicedata.following_url = slicedata.following_url.slice(0, -3)
		slicedata.starred_url = slicedata.starred_url.slice(0, -15)
		return slicedata
	}

}
