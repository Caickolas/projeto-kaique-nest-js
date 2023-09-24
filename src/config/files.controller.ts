import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { FilesService } from './files.service';
  import {
    FileInterceptor,
  } from '@nestjs/platform-express';
  import multerConfig from './multer.config';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
  
  @Controller('files')
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
  
    @Post()
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    @UseInterceptors(FileInterceptor('arquivo', multerConfig))
    uploadArquivo(@UploadedFile() file: Express.MulterS3.File) {
      console.log(file);
      return this.filesService.salvarDados(file);
    }
  }
  