import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import * as CryptoJS from 'crypto-js'
import { RegisterDto } from './dtos/register.dto'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async create(dto: RegisterDto){
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();

        const createdUser = new this.userModel(dto);
        await createdUser.save();
    }

    async existsByEmail(email : string) : Promise<boolean>{
        const result = await this.userModel.findOne({email});

        if(result){
            return true;
        }
        
        return false;
    }
}