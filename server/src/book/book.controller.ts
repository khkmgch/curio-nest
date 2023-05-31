import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Book_WithRelation } from 'src/types/prisma-extended/book-with-relation.type';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetChatgptResponseDto } from 'src/chatgpt/dto/get-chatgpt-response.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  //ログインしているユーザーの本棚にある本を全て取得する
  @Get('all/shelf')
  getLoginBooks(
    @Req() req: Request,
  ): Promise<Book_WithRelation[]> {
    return this.bookService.getBooks(req.user.id);
  }

  //ユーザーの本棚にある本を全て取得する
  @Get('all/shelf/:id')
  getBooksById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<Book_WithRelation[]> {
    return this.bookService.getBooks(userId);
  }

  //ログインしているユーザーの本棚から特定の本を１つ返す
  @Get(':id')
  getBookById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) bookId: number,
  ): Promise<Book_WithRelation> {
    return this.bookService.getBookById(
      req.user.id,
      bookId,
    );
  }

  @Post('recommend')
  getBooksRecommendedByAI(
    @Body() dto: GetChatgptResponseDto,
  ) {
    return this.bookService.getBooksRecommendedByAI(
      dto.prompt,
    );
  }

  @Get('recommend/test')
  test() {
    return this.bookService.test();
  }

  //本をキーワード検索(google books api)
  @Get('search/:keyword')
  searchBooks(@Param('keyword') keyword: string) {
    return this.bookService.searchBooks(keyword);
  }

  //本を本棚に新規追加
  @Post()
  createBook(
    @Req() req: Request,
    @Body() dto: CreateBookDto,
  ): Promise<Book_WithRelation> {
    return this.bookService.createBook(req.user.id, dto);
  }

  //本を本棚から削除
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) bookId: number,
  ): Promise<void> {
    return this.bookService.deleteBook(req.user.id, bookId);
  }
}
