import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ChatgptModule } from 'src/chatgpt/chatgpt.module';

@Module({
  imports: [PrismaModule, HttpModule, ChatgptModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
