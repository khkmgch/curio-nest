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

  //Csurfのプロテクション設定
  //authの@Get('/csrf')のエンドポイントでの処理の際に、csftTokenをcookieにセットするようにするための処理。
  //認証フローでCsrf Tokenを生成する時に使ったSecretをcookieに格納するが、
  //Csrf Token用のシークレットキーをjavascriptの方から読み取られたくないので、httpOnly: trueに設定する。
  //(cookieの_csrfにSecretキーが自動的に付与されるようになる。)
  //secureはpostmanで確認する際はfalseにしないと動作しないが、googleChromeなどのブラウザではtrueにしても
  //localhostの場合はsecure属性が無視されるためcookieの送受信が問題なく動作する。
  //valueについて、
  //クライアントのリクエストヘッダーにCsrf Tokenを付与してサーバーサイドに問い合わせをするため、
  //サーバーサイドはCsrf Tokenを読み込む必要がある。
  //その読み込む処理がreq.header('csrf-token')で、その値をvalueに設定している。
  //(ログイン時にヘッダーからCsrf Tokenを読み込んで認証するようになる)
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
      value: (req: Request): string => {
        return req.header('csrf-token');
      },
    }),
  );

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
