import { Button, List } from '@mantine/core';
import React, {
  FC,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useMutateBook } from '@/hooks/book/useMutateBook';
import { SearchedBookInfo } from '@/types/book/searched-book-info.type';
import { useSearchBook } from '@/hooks/search/useSearchBook';

// googleBooksId String
//   isbn String?
//   title String?
//   authors String[]
//   publisher String?
//   publishedDate String?
//   pageCount String?
//   imgLink String?
//   previewLink String?

// type Item = {
//   id: string;
//   volumeInfo: {
//     allowAnonLogging: boolean;
//     authors: string[];
//     canonicalVolumeLink: string;
//     categories: string[];
//     contentVersion: string;
//     description: string;
//     imageLinks: {
//       smallThumbnail: string;
//       thumbnail: string;
//     };
//     industryIdentifiers: Array<{
//       type: string;
//       identifier: string;
//     }>;
//     infoLink: string;
//     language: string;
//     maturityRating: string;
//     pageCount: number;
//     previewLink: string;
//     printType: string;
//     publishedDate: string;
//     readingModes: { text: boolean; image: boolean };
//     title: string;
//   };
// };

type Props = {
  id: string;
  info: SearchedBookInfo;
};

export const SearchedBookItem: FC<Props> = ({
  id,
  info,
}) => {
  //状態

  //本の識別コード
  const [isbn13, setIsbn13] = useState('');
  //本の詳細情報
  const [detailData, setDetailData] = useState<{
    anix: any;
    summary: any;
  }>({
    anix: null,
    summary: null,
  });

  //メソッド

  //本の情報から識別コードを探して取り出すメソッド
  //本の詳細情報を取得するメソッド
  const { findIsbn13, fetchDetailData } = useSearchBook();

  //コンポーネントの状態を初期設定するメソッド
  const init = async (info: SearchedBookInfo) => {
    //本の情報から識別コードを取り出す
    const isbn13 = findIsbn13(info);
    if (isbn13) {
      //本の識別コードをセット
      setIsbn13(isbn13);
      //識別コードを使って詳細情報を取得してセット
      const detail = await fetchDetailData(isbn13);
      setDetailData(detail);
    }
  };

  //本を本棚に追加するためのapi通信を行うメソッド
  const { createBookMutation } = useMutateBook();

  //本を本棚に追加するメソッド
  const addBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: info.title || '',
      googleBooksId: id,
      isbn: isbn13,
      authors: info.authors || [],
      publisher: detailData?.summary?.publisher || '',
      publishedDate: info.publishedDate || '',
      pageCount: info.pageCount
        ? info.pageCount.toString()
        : '',
      imgLink: info.imageLinks?.thumbnail || '',
      previewLink: info.previewLink || '',
    };
    createBookMutation.mutate(data);
  };

  useEffect(() => {
    init(info);
  }, []);
  return (
    <List.Item className='my-4 w-full bg-grayish-yellow-100 p-4 drop-shadow-2xl'>
      <div className='flex h-56 w-full flex-row md:w-128 lg:w-192'>
        <div className='flex h-full basis-1/4  items-center justify-center border-2 border-dotted border-gray-400 bg-slate-100 '>
          <img
            src={info.imageLinks?.thumbnail || ''}
            className='object-scale-down  md:object-contain'
          />
        </div>
        <div className='flex basis-2/3 flex-col overflow-y-auto text-grayish-brown-500 md:basis-1/2'>
          <div>
            <h3 className=''>「{info.title || ''}」</h3>
          </div>
          <div className='ml-10 w-4/5 '>
            <div className='mb-3 flex'>
              <div className='w-1/6'>初版: </div>
              <div className='w-5/6'>
                {info.publishedDate}
              </div>
            </div>
            <div className='mb-3 flex'>
              <div className='w-1/6'>著者: </div>
              <div className='w-5/6'>
                {info.authors?.map((author, index) => (
                  <span key={index}>{author} 、</span>
                ))}
              </div>
            </div>
            <div className='mb-3 flex'>
              <div className='w-1/6'>出版: </div>
              <div className='w-5/6'>
                {detailData?.summary?.publisher}
              </div>
            </div>

            <div className='flex'>
              <div className='w-1/3'>ページ: </div>
              <div className='w-2/3'>{info.pageCount}</div>
            </div>
          </div>
        </div>
        <div className='flex basis-1/6 flex-col  items-center justify-around md:basis-1/4 '>
          <Button variant='outline' color='bright-blue'>
            <a
              href={info.previewLink || ''}
              style={{ textDecoration: 'none' }}
              target='_blank'
              rel='noopener noreferrer'
            >
              詳しく見る
            </a>
          </Button>
          <form
            onSubmit={(e) => {
              addBook(e);
            }}
            className='flex justify-center'
          >
            <Button
              type='submit'
              variant='filled'
              color='bright-yellow'
            >
              本棚に追加
            </Button>
          </form>
        </div>
      </div>
    </List.Item>
  );
};
