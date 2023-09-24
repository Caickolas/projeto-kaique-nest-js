import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
    @Prop({required: true})
    filename:string;
    @Prop({required: true})
    contentLength:number;
    @Prop({required: true})
    contentType:string;
    @Prop({required: true})
    url:string;
}

export const FileSchema = SchemaFactory.createForClass(File);