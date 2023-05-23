//本の検索でapiから取得するデータ型
export type SearchedBookData = {
  kind: string;
  totalItems: number;
  items: Array<any>;
};
