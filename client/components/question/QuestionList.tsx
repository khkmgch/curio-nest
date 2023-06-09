import { Grid, Loader } from '@mantine/core';
import { QuestionItem } from './QuestionItem';
import { FC, useEffect, useState } from 'react';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import { User_WithRelation } from '@/types/prisma-extended/user-with-relation.type';
import { useQueryQuestion } from '@/hooks/question/useQueryQuestion';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { useGetQuestionList } from '@/hooks/question/useGetQuestionList';

type Props = {
  isTimeline: boolean;
  isMine: boolean;
  userId: number;
};
export const QuestionList: FC<Props> = ({
  isTimeline,
  isMine,
  userId,
}) => {
  //状態

  //Questionの配列
  const [questions, setQuestions] = useState<
    Question_WithRelation[]
  >([]);

  //ログインしているユーザー
  const { data: loginUser, status: userStatus } =
    useQueryUser();

  //ログインしているユーザーのQuestionの配列
  const { data: loginQuestions, status: questionStatus } =
    useQueryQuestion();

  //メソッド

  //fetchQuestions:Questionsを取得するメソッド
  //filterQuestions:タイムラインorプロフィール、公開or非公開によって表示するデータ(questions)を変化させるメソッド
  const { fetchQuestions, filterQuestions } =
    useGetQuestionList();

  useEffect(() => {
    if (userId !== 0) {
      //apiから取ってきたデータをsetQuestionに渡して状態をセットする初期化メソッド
      //Questionの公開・非公開の状態(isPrivate)によって、filter関数にかける。
      const init = async (
        isTimeline: boolean,
        isMine: boolean,
        loginQuestions: Question_WithRelation[] | undefined,
        loginUser:
          | Omit<User_WithRelation, 'hashedPassword'>
          | undefined,
        userId: number
      ) => {
        //apiからデータを取ってくる
        const questions = await fetchQuestions(
          isTimeline,
          isMine,
          loginQuestions,
          userId
        );
        //タイムラインorプロフィール、公開or非公開によって取ってきたデータ(questions)にフィルターをかける
        const data: Question_WithRelation[] =
          await filterQuestions(
            isTimeline,
            isMine,
            loginUser,
            questions
          );
        //コンポーネントの状態:questionsにセット
        if (data.length > 0) {
          setQuestions(data);
        }
      };
      init(
        isTimeline,
        isMine,
        loginQuestions,
        loginUser,
        userId
      );
    }
  }, [
    loginQuestions,
    questionStatus,
    userId,
    isMine,
    isTimeline,
    loginUser,
    userStatus,
  ]);

  if (
    questionStatus === 'loading' ||
    userStatus === 'loading' ||
    !loginUser ||
    userId === 0
  )
    return <Loader />;
  else
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
            <Grid.Col md={6} key={question.id}>
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
