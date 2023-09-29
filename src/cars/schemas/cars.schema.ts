import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AnyArray, HydratedDocument } from "mongoose";
import { Like } from "./likes.schema";

export type CarsDocument = HydratedDocument<Cars>;

@Schema()
export class Cars {
    
    @Prop({required: true})
    name:string;
    @Prop({required: true})
    brand:string;
    @Prop({required: true})
    model:string;
    @Prop({required: true})
    likes: Like[]

    // @Prop({required: true})
    // photo:string;
    
}

export const CarsSchema = SchemaFactory.createForClass(Cars);