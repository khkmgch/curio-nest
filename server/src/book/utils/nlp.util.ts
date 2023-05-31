import {
  builder,
  Tokenizer,
  TokenizerBuilder,
  IpadicFeatures,
} from 'kuromoji';

export class NLPUtil {
  public static getTokenizer(): Promise<
    Tokenizer<IpadicFeatures>
  > {
    const tokenizerBuilder: TokenizerBuilder<IpadicFeatures> =
      builder({
        dicPath: 'node_modules/kuromoji/dict',
      });

    return new Promise<Tokenizer<IpadicFeatures>>(
      (resolve, reject) => {
        tokenizerBuilder.build(
          (
            err: Error,
            tokenizer: Tokenizer<IpadicFeatures>,
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(tokenizer);
            }
          },
        );
      },
    );
  }
  static async extractBookTitles(text: string) {
    console.log('text: ', text);

    const titles: string[] = [];

    const tokenizer: Tokenizer<IpadicFeatures> =
      await NLPUtil.getTokenizer();

    const tokens: IpadicFeatures[] =
      tokenizer.tokenize(text);
    // console.log('tokens: ', tokens);

    const nouns: IpadicFeatures[] = tokens.filter(
      (token) =>
        (token.pos === '名詞' ||
          token.pos === '固有名詞') &&
        !(
          token.pos_detail_1 === '数' ||
          token.pos_detail_1 === 'サ変接続' ||
          token.pos_detail_2 === '人名'
        ) &&
        token.surface_form !== '著者',
    );

    // 正規表現パターンで本のタイトルを抽出
    const regex1: RegExp = /[『「【](.+?)[』」】]/g;
    let match: boolean = false;
    let arr1: RegExpExecArray;
    while ((arr1 = regex1.exec(text)) !== null) {
      match = true;
      titles.push(arr1[1]);
    }

    if (!match) {
      const regex2: RegExp = /\d\.\s*(.+?)(?=[\s（\(\:])/g;
      let arr2: RegExpExecArray;
      while ((arr2 = regex2.exec(text)) !== null) {
        titles.push(arr2[1]);
      }
    }

    // 名詞や固有名詞をタイトルとして追加
    nouns.forEach((noun) => {
      if (!titles.includes(noun.surface_form)) {
        titles.push(noun.surface_form);
      }
    });

    console.log('titles: ', titles);

    return titles;
  }
}
