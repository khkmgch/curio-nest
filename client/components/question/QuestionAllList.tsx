import { Grid, Loader } from '@mantine/core';
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

  useEffect(() => {
    //apiから取ってきたデータをsetQuestionに渡して状態をセットする初期化メソッド
    const init = async () => {
      const data = await getAllQuestions();
      if (data && data.length > 0) {
        setQuestions(data);
      }
    };
    init();
  }, [status]);
  if (status === 'loading' || !loginUser) return <Loader />;

  return (
    <Grid
      className='m-4 mt-0 w-4/5 '
      justify='center'
      align='flex-start'
      gutter={15}
      gutterXs='md'
      gutterMd='xl'
      gutterXl={50}
    >
      {questions?.map((question) => {
        return (
          <Grid.Col md={6}>
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
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
