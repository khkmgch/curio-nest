import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import { HourChartData } from '@/types/chart/hour-chart-data.type';

export class HourChartUtil {
  //Questionを加工してデータを返すメソッド
  //24時間のうち、どの時間帯にQuestionを作成することが多いかを表す
  static processQuestions(
    questions: Question_WithRelation[]
  ) {
    //サイズが24の配列
    let data: HourChartData[] = new Array(24);
    for (let i = 0; i < data.length; i++) {
      //hour: 時
      //value: (hour時に作成されたQuestionの数) / (Questionの総数)
      data[i] = { hour: i.toString(), value: 0 };
    }
    for (let i = 0; i < questions.length; i++) {
      const curr = questions[i];
      const currDate = new Date(curr.createdAt);
      const hour = currDate.getHours();
      const value = data[hour].value;
      data[hour] = {
        hour: hour.toString(),
        value: value + 1 / questions.length,
      };
    }
    return data;
  }
}
