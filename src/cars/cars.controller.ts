import { Controller, Post, HttpCode, HttpStatus, Body, Put, Param, Get, Delete, Request, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsDto } from "./dtos/cars.dto";
import { CarsMessagesHelper } from './helpers/messages.helper'
import { UserService } from "src/user/user.service";
import { IsPublic } from "src/auth/decorators/ispublic.decorator";

@Controller("cars")
export class CarsController {
    constructor(
        private readonly carsService: CarsService,
        private readonly userService: UserService

        ) { }

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
    @HttpCode(HttpStatus.OK)
    async create(@Request() req, @Body() dto: CarsDto) {
        const {userId} = req?.user;

        const user = await this.userService.getUserById(userId);

        if(user.Admin === true){
            await this.carsService.create(dto);

            const carMessage = CarsMessagesHelper.CAR_CREATED_WITH_SUCCESS
    
            return carMessage
        }

        throw new UnauthorizedException(CarsMessagesHelper.CAR_UNAUTHORIZED)
        
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Request() req, @Param() params, @Body() dto: CarsDto) {
        const { id } = params;

        const {userId} = req?.user;

        const user = await this.userService.getUserById(userId);

        if(user.Admin === true){
            const updatedCar = await this.carsService.update(id, dto);

            return updatedCar
        }

        throw new UnauthorizedException(CarsMessagesHelper.CAR_UNAUTHORIZED)


    }

    @Delete(':id')
    async deleteCar(@Request() req, @Param() params){
        const { id } = params;

        const {userId} = req?.user;

        const user = await this.userService.getUserById(userId);

        if(user.Admin === true){

        await this.carsService.delete(id)

        const carMessage = CarsMessagesHelper.CAR_DELETED_WITH_SUCCESS

        return carMessage
        }

        throw new UnauthorizedException(CarsMessagesHelper.CAR_UNAUTHORIZED)
    }
}