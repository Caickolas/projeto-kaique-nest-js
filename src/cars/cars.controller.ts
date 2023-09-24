import { Controller, Post, HttpCode, HttpStatus, Body, Put, Param, Get, Delete } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsDto } from "./dtos/cars.dto";
import { IsPublic } from "src/auth/decorators/ispublic.decorator";

@Controller("cars")
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get(':id')
    @IsPublic()
    async getCarsById (@Param() params){
        const { id } = params;

        const carro = await this.carsService.findone(id)

        return carro
    }

    @Get()
    @IsPublic()
    async getCars (){
        const result = await this.carsService.findAll()

        return result.map(m => ({
            id: m._id.toString(),
            name: m.name,
            brand: m.brand,
            model: m.model,
            // photo: m.photo
        }) as CarsDto);
    }


    @Post()
    @IsPublic()
    @HttpCode(HttpStatus.OK)
    async create(@Body() dto: CarsDto) {
        await this.carsService.create(dto);
    }

    @Put(':id')
    @IsPublic()
    @HttpCode(HttpStatus.OK)
    async update(@Param() params, @Body() dto: CarsDto) {

        const { id } = params;

        const updatedCar = await this.carsService.update(id, dto);

        return updatedCar
    }

    @Delete(':id')
    @IsPublic()
    async deleteCar(@Param() params){
        const { id } = params;

        await this.carsService.delete(id)
    }
}