import { List, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useGetQuestion } from '@/hooks/question/useGetQuestion';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import { QuestionItem } from './QuestionItem';

export const QuestionAllList = () => {
  //状態

  //Questionのリスト
  const [questions, setQuestions] = useState<
    Question_WithRelation[]
  >([]);

  //ログインしているユーザー
  const { data: loginUser, status } = useQueryUser();

  //メソッド

  //apiからデータを取ってくるメソッド
  const { getAllQuestions } = useGetQuestion();

  //apiから取ってきたデータをsetQuestionに渡して状態をセットする初期化メソッド
  const init = async () => {
    const data = await getAllQuestions();
    if (data && data.length > 0) {
      setQuestions(data);
    }
  };

  useEffect(() => {
    init();
  }, [status, init]);
  if (status === 'loading' || !loginUser) return <Loader />;

  return (
    <List
      my='lg'
      spacing='sm'
      className='lg:w-192 w-full list-none px-2 md:w-4/5 '
    >
      {questions?.map((question) => {
        return (
          <QuestionItem
            key={question.id}
            id={question.id}
            title={question.title}
            description={question.description}
            isPrivate={question.isPrivate}
            createdAt={question.createdAt}
            books={question.books}
            likes={question.likes}
            userId={question.userId}
            isMine={loginUser.id === question.userId}
          />
        );
      })}
    </List>
  );
};
