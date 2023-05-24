import axios from 'axios';

import { Book_WithRelation } from '@/types/prisma-extended/book-with-relation.type';
import { SearchedBookData } from '@/types/book/searched-book-data.type';
import { Link } from '@prisma/client';

export const useGetBook = () => {
  const getBooksByUserId = async (userId: number) => {
    const response: Book_WithRelation[] = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/book/all/shelf/${userId}`
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return null;
      });
    return response;
  };
  const getBookById = async (bookId: number) => {
    const response: Book_WithRelation = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return null;
      });
    return response;
  };

  const searchBooksByKeyword = async (keyword: string) => {
    const response: SearchedBookData | null = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/book/search/${keyword}`
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return null;
      });
    return response;
  };

  //本のリストを取得して返すメソッド
  type Data = Book_WithRelation | null;
  const getBookByLinks = async (links: Link[]) => {
    const books: Data[] = new Array(links.length);
    for (let i = 0; i < links.length; i++) {
      const book = await getBookById(links[i].bookId);
      books[i] = book;
    }
    return books;
  };

  return {
    getBooksByUserId,
    getBookById,
    searchBooksByKeyword,
    getBookByLinks,
  };
};
