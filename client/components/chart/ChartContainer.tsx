import { Center, SegmentedControl } from '@mantine/core';
import {
  IconChartBar,
  IconChartDots2,
} from '@tabler/icons';
import { FC, useEffect, useState } from 'react';
import { useQueryQuestion } from '@/hooks/question/useQueryQuestion';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import { DateChart } from './DateChart';
import { HourChart } from './HourChart';
import { useGetQuestionList } from '../../hooks/question/useGetQuestionList';

type Props = {
  userId: number;
  isMine: boolean;
};

export const ChartContainer: FC<Props> = ({
  isMine,
  userId,
}) => {
  //状態

  //ログインしているユーザーのQuestions
  const { data: loginQuestions, status: QuestionsStatus } =
    useQueryQuestion();

  //グラフに使用するQuestionの配列
  const [questions, setQuestions] = useState<
    Question_WithRelation[]
  >([]);

  //画面に表示するグラフのタイプ(グラフの切り替えに使用)"date"or"hour"
  const [chart, setChart] = useState('date');

  //開いているページが自分or他の人によって、異なるQuestionsを返すメソッド
  const { fetchQuestions } = useGetQuestionList();

  //コンポーネントの状態を初期設定するメソッド
  const init = async () => {
    const questions = await fetchQuestions(
      false,
      isMine,
      loginQuestions,
      userId
    );
    setQuestions(questions);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className='h-196 flex w-full flex-col items-center'>
      <div className='flex w-full justify-center'>
        <SegmentedControl
          fullWidth
          radius={10}
          color='gray'
          transitionDuration={500}
          transitionTimingFunction='linear'
          value={chart}
          onChange={setChart}
          data={[
            {
              label: (
                <Center>
                  <IconChartBar
                    size={32}
                    className='text-gray-300'
                  />
                </Center>
              ),
              value: 'date',
            },
            {
              label: (
                <Center>
                  <IconChartDots2
                    size={32}
                    className='text-gray-300'
                  />
                </Center>
              ),
              value: 'hour',
            },
          ]}
        />
      </div>
      {chart === 'date' ? (
        <DateChart questions={questions} />
      ) : chart === 'hour' ? (
        <HourChart questions={questions} />
      ) : (
        <></>
      )}
    </div>
  );
};
