import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//ValidationPipe: DTOとクラスバリデーションを有効化する
import { INestApplication, ValidationPipe } from '@nestjs/common';

//Request: リクエストのデータ型
import { Request } from 'express';

//cookieParser: Jwtトークンのやり取りをcookieベースで行うので、クライアントのリクエストからcookieを取り出すのに必要
import * as cookieParser from 'cookie-parser';

//csurf: csrf対策でcsrfトークンを使えるようにする
import * as csurf from 'csurf';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  //DTOとクラスバリデーションを使う
  //whitelist: true で、dtoに含まれないものが送られてきた際に省く
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //Corsの設定
  app.enableCors({
    //credentials: フロントエンドとバックエンドでJWTトークンをcookieベースで通信する。
    credentials: true,
    //バックエンドのサービスへのアクセスを許可したい、フロントエンド(React側)のドメインを指定
    origin: ['http://localhost:3000'],
  });

  //グローバルのミドルウェアでcookieParserを実行し、
  //フロントエンドから受け取ったcookieを解析できるようにする。
  app.use(cookieParser());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
