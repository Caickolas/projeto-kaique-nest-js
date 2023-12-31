import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Cars, CarsSchema } from "./schemas/cars.schema";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { UserModule } from "src/user/user.module";


@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{name: Cars.name, schema:CarsSchema}])
    ],
    controllers: [CarsController],
    providers: [CarsService],
    exports: [MongooseModule, CarsService] 
})
export class CarsModule{}