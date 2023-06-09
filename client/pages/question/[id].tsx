import { Loader, ScrollArea } from '@mantine/core';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { QuestionEditForm } from '@/components/question/QuestionEditForm';
import { useGetQuestion } from '../../hooks/question/useGetQuestion';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
const Question: NextPage = () => {
  const router = useRouter();

  //状態

  //現在編集中のQuestionの状態
  const [editingQuestion, setEditingQuestion] = useState<
    Omit<Question_WithRelation, 'createdAt'>
  >({
    id: 0,
    updatedAt: new Date(),
    title: '',
    description: '',
    isPrivate: false,
    userId: 0,
    books: [],
    likes: [],
  });

  //メソッド

  //editingQuestionを更新するメソッド
  const updateEditingQuestion = (payload: any) =>
    setEditingQuestion({
      id: payload.id,
      updatedAt: payload.updatedAt,
      title: payload.title,
      description: payload.description,
      isPrivate: payload.isPrivate,
      userId: payload.userId,
      books: payload.books,
      likes: payload.likes,
    });

  //idでQuestionを取得するメソッド
  const { getQuestionById } = useGetQuestion();

  //コンポーネントの状態を初期設定するメソッド
  const init = async (
    id: string | string[] | undefined
  ) => {
    if (typeof id !== 'string') return;
    const response: { data: Question_WithRelation } | null =
      await getQuestionById(parseInt(id));
    if (response) {
      setEditingQuestion(response.data);
    }
  };
  useEffect(() => {
    const { id } = router.query;
    init(id);
  }, [router.query]);
  return (
    <Layout title='Question'>
      {editingQuestion.id !== 0 ? (
        <QuestionEditForm
          question={editingQuestion}
          update={updateEditingQuestion}
        />
      ) : (
        <Loader />
      )}
    </Layout>
  );
};
export default Question;
