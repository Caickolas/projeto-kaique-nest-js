import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";

@Schema({ _id: false })
export class Like {
    @Prop()
    userWhoLiked: Object;
}

export const likeSchema = SchemaFactory.createForClass(Like)