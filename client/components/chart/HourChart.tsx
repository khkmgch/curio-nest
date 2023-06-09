import React, { FC, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import { HourChartData } from '@/types/chart/hour-chart-data.type';
import { HourChartUtil } from '@/utils/chart/hour-chart.util';

type Props = {
  questions: Question_WithRelation[];
};

export const HourChart: FC<Props> = ({ questions }) => {
  const [data, setData] = useState<HourChartData[]>([]);


  //コンポーネントの状態を初期設定するメソッド
  const init = (questions: Question_WithRelation[]) => {
    const data: HourChartData[] = HourChartUtil.processQuestions(questions);
    setData(data);
  };
  useEffect(() => {
    init(questions);
  }, [questions]);

  return (
    <LineChart
      width={1024}
      height={400}
      data={data}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='hour'>
        <Label
          value='時間'
          offset={-3}
          position='insideBottom'
        />
      </XAxis>
      <YAxis />
      <Tooltip />
      <Legend
        verticalAlign='top'
        height={40}
        iconSize={20}
      />

      <Line
        name='作成した時間帯'
        type='monotone'
        dataKey='value'
        stroke='#B32C2B'
        strokeWidth={3}
      />
    </LineChart>
  );
};
