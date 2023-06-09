import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploadUtil } from './utils/create-upload.util';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: CreateUploadUtil.imageFileFilter,
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({ maxSize: 50000000 })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    console.log('file: ', file);
    return {
      fileName: file.filename,
      file: file.buffer,
    };
  }
}
