import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book_WithRelation } from 'src/types/prisma-extended/book-with-relation.type';
import { CreateBookDto } from './dto/create-book.dto';
import { IGoogleBooks } from './interfaces/i-google-books.interface';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { NLPUtil } from './utils/nlp.util';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);
  constructor(
    private prisma: PrismaService,
    private readonly chatgpt: ChatgptService,
    private readonly httpService: HttpService,
  ) {}

  //ユーザーの本棚にある本を全て取得する
  getBooks(userId: number): Promise<Book_WithRelation[]> {
    return this.prisma.book.findMany({
      where: {
        userId,
      },
      include: {
        links: true,
      },
      //新しい順に並べて返す
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //ログインしているユーザーの本棚から特定の本を１つ返す
  getBookById(
    userId: number,
    bookId: number,
  ): Promise<Book_WithRelation> {
    return this.prisma.book.findFirst({
      where: {
        userId,
        id: bookId,
      },
      include: {
        links: true,
      },
    });
  }
  //本をキーワード検索(google books api)
  async searchBooks(
    keyword: string,
  ): Promise<IGoogleBooks> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<IGoogleBooks>(
          `https://www.googleapis.com/books/v1/volumes?q=${keyword}`,
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
  async getBooksRecommendedByAI(prompt: string) {
    const text = (await this.chatgpt.getResponse(prompt))
      .content;
    const titles: string[] =
      await NLPUtil.extractBookTitles(text);
    const books = [];
    for (let i = 0; i < 3 && i < titles.length; i++) {
      console.log(titles[i]);
      books.push(await this.searchBooks(titles[i]));
    }
    console.log('books: ', books);
    const res = [];
    for (let i = 0; i < books.length; i++) {
      res.push(books[i].items[0]);
      res.push(books[i].items[1]);
    }
    return res;
  }
  async test() {
    const text1 =
      '1. 「なぜ空は青いのか？」2. 「光の色に騙されないために――「空の青」とは何か」3. 「色のなぞ――私たちの五感を支配する色の不思議」';
    const text2 =
      '1. 『自然現象を科学する』（著者: 佐藤健太郎）自然現象の中でも、空の色について詳しく解説しています。 2. 『空の色と光の不思議』（著者: 熊谷信）空の色や光の性質についての基礎知識を分かりやすく解説しています。3. 『天空の色彩学』（著者: 宇田川洋）';
    const text3 =
      '1. 自然現象を科学する（著者: 佐藤健太郎）自然現象の中でも、空の色について詳しく解説しています。 2. 空の色と光の不思議（著者: 熊谷信）空の色や光の性質についての基礎知識を分かりやすく解説しています。3. 天空の色彩学（著者: 宇田川洋）';

    return NLPUtil.extractBookTitles(text3);
  }

  //本を本棚に新規追加
  async createBook(
    userId: number,
    dto: CreateBookDto,
  ): Promise<Book_WithRelation> {
    try {
      //googleBooksId, userIdでMy本棚から本を探し、本が存在する場合は新規追加をしない。
      const found = await this.findByGoogleBooksId(
        dto.googleBooksId,
        userId,
      );
      if (found) {
        return null;
      }
      const book = await this.prisma.book.create({
        data: {
          userId,
          ...dto,
        },
        include: {
          links: true,
        },
      });
      return book;
    } catch (err) {
      throw err;
    }
  }
  //My本棚からgoogleBooksIdで本を探すメソッド
  async findByGoogleBooksId(
    googleBooksId: string,
    userId: number,
  ): Promise<Book_WithRelation> {
    return this.prisma.book.findFirst({
      where: {
        googleBooksId,
        userId,
      },
      include: {
        links: true,
      },
    });
  }

  //本を本棚から削除する
  async deleteBook(
    userId: number,
    bookId: number,
  ): Promise<void> {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book || book.userId !== userId) {
      throw new ForbiddenException(
        'No permission to delete',
      );
    }
    await this.prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  }
}
