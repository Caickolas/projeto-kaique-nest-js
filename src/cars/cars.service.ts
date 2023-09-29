import {Injectable, Logger} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import { Cars, CarsDocument } from './schemas/cars.schema'
import { Model } from 'mongoose'
import {CarsDto} from "./dtos/cars.dto"
import { FilesService } from 'src/config/files.service'
import { UserDocument } from 'src/user/schemas/user.schema'

@Injectable()
export class CarsService {
    private logger = new Logger(CarsService.name);

    constructor(@InjectModel(Cars.name) 
    private readonly carModel: Model<CarsDocument>,
    private readonly userModel: Model<UserDocument>,
    // private readonly fileservice: FilesService
    ){}

    async create(dto: CarsDto){
        this.logger.debug('Create - started');

        const createCar = new this.carModel(dto);
        await createCar.save();
    }

    async getCarById(id: string){
        this.logger.debug(`findOne - ${id} `);

        return await this.carModel.findById({ _id: id });
    }

    async findAll(){
        this.logger.debug('findAll - started');

        return await this.carModel.find();
    }


    async update(id: string, dto: CarsDto) {
        this.logger.debug(`Update - ${id} - ${dto} `);

        return await this.carModel.findByIdAndUpdate({_id: id}, dto)
    }

    async delete(id: string){
        this.logger.debug(`Delete - ${id} `);

        return await this.carModel.findByIdAndDelete({
            _id: id
          })
    }
    
    async like (userId: string, carId: string){
        this.logger.debug(`you ${userId} liked/desliked ${carId} `);

        const newUser = await this.userModel.findById({ _id: userId })

        const newCar = await this.carModel.findById({ _id: carId })

        const indexDoUsuarioNoLike = newCar.likes.findIndex((e : any) => e.toString() === newUser._id.toString());

        if(indexDoUsuarioNoLike != -1){
            newCar.likes.splice(indexDoUsuarioNoLike, 1);
            return await this.carModel.findByIdAndUpdate({_id : newCar._id}, newCar);
        }else {
            // se o index for -1 sinal q ele nao curte a foto
            newCar.likes.push(newUser._id);  
            return await this.carModel.findByIdAndUpdate({_id : newCar._id}, newCar);
        }

    }

}