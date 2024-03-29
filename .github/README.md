# :grey_question:Curio Nest

日々の疑問を記録し管理するためのWebアプリです。  
以前作成した、「ShiRiTai」というアプリ(https://github.com/khkmgch/ShiRiTai) に  
データベースとバックエンドの機能を追加し、フルスタックアプリとして改良したものです。
## :globe_with_meridians:Url
https://curio-nest.vercel.app/

※ Render.comの無料枠にデプロイしているため、サーバーの起動に時間がかかります。  
また、8月14日に無料枠のデータベースサーバーが期限切れになるため、一度データの初期化を行う予定です。  
利用してくださった方には申し訳ありません！

## :desktop_computer:Demo
![demo](assets/demo.gif)

## :eyes:作成理由

#### 日々の疑問をそのままにしないため
疑問は好奇心の種として貴重なものと考えられます。 

私は生活の中で湧いた疑問を、そのまま忘れてしまうことがありました。  
また、ノートやスマホメモに書き留めても見返すことなくそのままにしてしまう場合もあり、  
これらをもったいない:exclamation:と感じたことが原点です。

解決策として、疑問を管理するためのアプリが欲しいと考え、作成に至りました。

#### 新たな疑問を促すため
また、多様な人が集まり繋がれる:handshake:というWebアプリの特性を利用することで、  
他のユーザーが記録した疑問を覗き、新たな疑問が湧くことを促すことができると考えました。

#### レベルアップのため
さらに、フルスタックな技術が必要なアプリをゴールに設定することで、作者のレベルアップ:muscle:を図りました。

## :clock3:期間
2022年10~11月、2023年5月の合計3ヶ月程

## :joystick:使い方/機能
### :orange_circle:主な流れ
1. 疑問を記録・投稿します
2. AIに、参考になる本を提案してもらいます
3. 本を本棚に追加し、疑問と紐づけします
4. 疑問が解決したら、記録に追記します

### :pencil2:記録
疑問を記録します。  
公開/非公開の設定ができます。
![write](assets/create-question.png)
### :memo:編集
#### AIレコメンド機能
記録した疑問を解決するために、参考になりそうな本をAIに提案してもらうことができます。  
本はMy本棚に追加することができます。

#### 答えを記入
レコメンド機能でおすすめされた本を読み、疑問が解決したら答えを書きましょう。

#### 本との紐づけ機能
疑問の解決のために読んだ本を疑問と紐づけしておくことで、  
再度見返した際に思考過程を振り返るための助けになります。

![edit](assets/edit-question.png)

### :chart_with_downwards_trend:分析
記録された疑問を集計し、データをグラフで表示します。  
あなたの疑問が生まれやすい時間帯や日付がひと目で分かります。
![chart](assets/profile-analysis.png)

### :books:My本棚
読んだ本を追加して管理することができます。  
他の人の本棚も覗けます。
![shelf](assets/profile-shelf.png)

### :mag:本の検索
AIレコメンド機能で気に入った本がなければ、キーワード検索することができます。
![search](assets/search-book.png)
### :people_holding_hands:タイムライン
タイムラインから他の人の疑問を見ることができます。  
また、他の人の疑問に共感したら、１クリックで自分の疑問として追加することができます。

### :raising_hand_man:プロフィール
#### フォロー
気に入ったユーザーがいれば、フォローできます。
#### 画像アップロード
SNSのように、プロフィール画像を好みのものに変更できます。

![profile](assets/profile-question.png)

### :old_key:認証
メールアドレスとパスワードを用いて認証を行います。  
新規登録/ログイン/ログアウト機能を実装しています。
![auth](assets/auth.png)


## :blue_book:バックエンドAPIの仕様書
詳細はこちらをクリックして下さい。
https://khkmgch.github.io/curio-nest/

## :hammer_and_wrench:使用技術
主な使用技術と開発フローを示しています。
![tech](assets/tech.drawio.png)
### 開発環境
- Docker / Docker Compose
### バックエンド
- NestJS (NodeJS)
- Typescript
- Prisma (データベース操作)

### データベース
- ~~MySQL~~
- PostgreSQL

### フロントエンド
- NextJS
- Typescript
- Tailwind CSS
- Mantine
- zustand (状態管理)

### ホスティング
- バックエンド
  - ~~Google Cloud Build~~
  - ~~Google Cloud Run~~
  - render
- データベース
  - ~~Google Cloud SQL~~
  - render
- フロントエンド
  - Vercel

## 📗それぞれの技術の採用理由
### Docker / Docker Compose
以前の開発で、開発環境と本番環境の違い(パッケージのバージョンなど)によりデプロイに失敗した経験がありました。  
そこで、Dockerコンテナを使用して開発し、Dockerfileを使ってコンテナ環境をビルド・デプロイすることによって、  
開発環境と本番環境を揃え、ホスティングをスムースに行えるようにしました。

### Typescript
  - これまでJavascriptで開発しており、型のあるTypesciptで書いてみたかった
  - 継続的に開発する際には型がある方が管理しやすいと考えた

### NestJS
  - Typescriptで構築されたフレームワークである
  - MVC(Model-View-Controller)に基づいている
    - アプリの各部分をモジュールとして分割して開発や拡張ができる
    - モデルとコントローラの分離により、ロジックとリクエストの処理を分けて管理できる
    - プロジェクトのメンテナンス性が高まる
   
### Prisma
- SQLを書かずに、データベースへのアクセスやデータ操作を簡単に行えるため、迅速に開発することができる。
- データベースのスキーマをコードベースで定義
  - モデルの変更や追加が容易なので、アプリの要件の変更に迅速に対応することができる。
  - モデルに基づいて型安全なコードを自動生成できるため、タイプミスによる問題を事前に防ぐことができる。
  - データベースのスキーマ管理やマイグレーションを簡単に行える
- 複数のデータベースシステム（MySQL、PostgreSQL、SQLiteなど）に対して一貫したインターフェースを提供しているため、異なるデータベース間での移行や切り替えが容易。

### NextJS
- 簡単にセットアップでき、新しいプロジェクトの立ち上げを素早く行える。
- ダイナミックなルーティングやネストされたルーティングを簡単に設定することができる。

### Mantine
- UIコンポーネントを利用することで、開発時間を短縮できる。

### Tailwind CSS
- 色や線などの細かい設定が可能
- BootStrapはデザインが画一化されているため、細かい調整がしやすいTailwindを使ってみたかった
- 予め用意されたボタンなどがなく、記述量が多くなってしまうため、Mantineと併用する

### Zustand
- 簡潔な記述で状態管理を行える
  
## :pushpin:特にこだわった箇所
### 疑問の解決を手助け
AIレコメンド機能により、疑問の解決を手助けする機能を実装しました。

具体的には、以下の手順です。

1. ユーザーが記録した疑問の内容を基に、疑問の解決の助けになりそうなおすすめ本を、GPT-3.5を使って提案してもらいます。
2. GPT-3.5が生成した文章に対して、正規表現やテキスト解析ツール(kuromoji)を使って、本のタイトルや固有名詞を抽出します。
3. 抽出結果をキーワードとして、Google Books APIで本を検索し、詳細な情報はOpenBDで補います。
4. クライアントに6冊分の本のデータを返し、おすすめ表示します。

[該当するコード]
- [getBooksRecommendedByAI()](../server/src/book/book.service.ts) (73行目)
- [テキスト解析](../server/src/book/utils/nlp.util.ts)
- [GPT](../server/src/chatgpt/chatgpt.service.ts)
### 思考過程を記録
疑問と本を紐づける機能により、ユーザーがどの本を読んで疑問を解決したのかの記録を残せるようにしました。  
これにより、振り返りを簡単に行うことができます。

実装は、QuestionテーブルとBookテーブルの関係を表すLinkテーブル（中間テーブル）を定義する方法を取りました。

[該当するコード]
- [疑問と本を紐づけするコード](../server/src/question/question.controller.ts) (96行目)

### 本棚
読んだ本を本棚に追加して管理できるようにしました。

以下は実装理由です。  
- 疑問と本を結び付けて管理したい
- 自分の読んだ本を管理したい
- 他のユーザーの本棚を覗いてみたいという作者の好奇心

[該当するコード]
- [BookShelfコンポーネント](../client/components/book/BookShelf.tsx)

## :cd:データベース
以下のようなエンティティとリレーションで構成しました。  
多対多の関係になる部分は、中間テーブルを用いて１対多の関係で表現しました。
![er](assets/er.drawio.png)

| テーブル | 説明 |
| --- | --- |
| User | ユーザー情報を管理 |
| Question | 疑問の情報を管理 |
| Book | 本の情報を管理 |
| Link ※ | どの疑問と、どの本が紐づけされているか |
| Like ※ | どのユーザーが、どの疑問をいいねしているか |
| Follow ※ | どのユーザーが、どのユーザーをフォローしているか |

※ 中間テーブル

[該当するコード]
- [Prismaのスキーマファイル](../server/prisma/schema.prisma)

## :muscle:苦労した点
### ①デプロイ
始めは、NestJSとMySQLで開発しており、Cloud Build/Cloud Run/Cloud SQLを使ってホスティングをしていました。  
しかし、Cloud SQLの費用が予想以上にかかってしまったため、renderでのホスティングに切り替えました。

renderは、MySQLデータベースに対応していないため、PostgreSQLに移行しました。  
その際、Prismaを使用していたため、SQL文の修正が必要なく迅速に移行でき、  
Prismaを使用するメリットを実感できました。

### ②Dockerコンテナを使った開発環境の準備
以前、開発環境と本番環境の違いによるデプロイの失敗を経験しました。  
そのため、開発環境と本番環境を揃えるためにDockerコンテナの使用を試みました。

具体的には、フロントエンド、バックエンド、データベースのそれぞれのコンテナを起動して  
コンテナ同士を接続しました。

Docker関連のファイルの準備を、ドキュメントを参照しながら行ったため、時間がかかりましたが  
勉強になりました。

[該当するコード]
- [docker-compose.yml](../docker-compose.yml)

### ③バックエンドAPIの開発
初めて、バックエンドAPIの開発に挑戦しました。  
NestJSフレームワークを使用し、機能ごとにモジュールを分けて、RestAPIを  
開発する方法を習得できました。

また、GPT-3.5、Google Books APIやOpenBDなどの外部APIから取得したデータを加工し、  
クライアントに必要な情報を表示する処理も行いました。

### ④データベース
データベースを扱うのも初めてでした。  
DBeaverやPrisma Studioなどのクライアントツールでテーブルを確認しながら、  
Prismaを使ってスキーマの作成とマイグレーションを行いました。  
データベース設計の流れを掴むことができました。

### ⑤認証
#### CSRF対策  
アプリへのアクセス時にCSRF Tokenを発行しcookieにシークレットキーを設定します。  
リクエストのHeaderに有効なCSRF Tokenを含まない場合はアクセスできないように実装しました。

※参考: https://www.trendmicro.com/ja_jp/security-intelligence/research-reports/threat-solution/csrf.html
#### JWT
ログイン時にJWTを発行し、cookieに設定します。 

[該当するコード]
- [認証部分](../server/src/auth)
### ⑥NextJS
Nextjsを使うのも初めてでした。  
コンポーネントベースの記述方法や、動的なルーティングの方法など、学びが多くありました。

また、バックエンドAPIと接続し、データを取得してエラーハンドリングを行う部分の記述方法  
についても学ぶことができました。

### ⑦UI
これまでBootstrapを使っていました。  
他のツールも試してみたいと考え、Tailwind CSSとMantineを使いました。

## :pencil2:今後の改良点
### ①手軽さ
現在は、アプリをブラウザで開く必要があります。  
ユーザーが手軽に疑問を記録できることが大切なので、  
スマホのプッシュ通知や、ラインのトーク画面から疑問を記録する機能を検討しています。

### ②リマインド機能
疑問を記録してから一定期間が経つと、メールでリマインドする機能を実装します。

### ③カテゴリ機能
記録した疑問をカテゴリ分けして、カテゴリごとに管理できるようにします。
