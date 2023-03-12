import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type DataDocument = HydratedDocument<NewUser>;

@Schema()
export class NewUser {
	@Prop()
	login: string

	@Prop()
	html_url: string

	@Prop()
	following_url: string

	@Prop()
	avatar_url: string

	@Prop()
	starred_url: string

	@Prop()
	created_at: string

	@Prop()
	repos_url: string


	@Prop({ type: Date, default: Date.now })
	date: Date;

}

export const DataSchema = SchemaFactory.createForClass(NewUser);