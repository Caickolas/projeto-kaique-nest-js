import { Injectable, Logger } from '@nestjs/common';
import { File, FileDocument } from './schemas/files.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FilesService {
    private logger = new Logger(FilesService.name);
    constructor(@InjectModel(File.name) private readonly fileModel: Model<FileDocument>){}

  async salvarDados(file: Express.MulterS3.File) {
    this.logger.debug('files - started');
    
    const arquivo = new File();
    arquivo.filename = file.key;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = file.location;

    const filetosave = new this.fileModel(arquivo)
    await filetosave.save();
  }
}
