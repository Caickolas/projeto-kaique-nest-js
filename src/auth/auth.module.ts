/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.USER_JWT_SECRET_KEY
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }