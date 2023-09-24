import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CarsDocument = HydratedDocument<Cars>;

@Schema()
export class Cars {
    
    @Prop({required: true})
    name:string;
    @Prop({required: true})
    brand:string;
    @Prop({required: true})
    model:string;
    // @Prop({required: true})
    // photo:string;
}

export const CarsSchema = SchemaFactory.createForClass(Cars);