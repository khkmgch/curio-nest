import { Like, Link } from "@prisma/client";

//現在編集中のQuestionを管理するためのデータ型
export type EditingQuestion = {
  id: number;
  title: string;
  description?: string | null;
  isPrivate: boolean;

  books: Link[];
  likes: Like[];
};
