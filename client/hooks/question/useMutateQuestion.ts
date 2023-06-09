import { useStore } from '@/store/useStore';
import { CreatingQuestion } from '@/types/question/creating-question.type';
import { EditingQuestion } from '@/types/question/editing-question.type';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import { useRouter } from 'next/router';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useMutateQuestion = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const reset = useStore(
    (state) => state.resetCreatingQuestion
  );

  //useMutationはデータを登録・編集・削除したりする場合に使う。
  //第一引数には、api通信の関数
  //idは自動採番される
  //第２引数には、通信が成功した場合と失敗した場合の処理を書く
  const createQuestionMutation = useMutation(
    async (question: CreatingQuestion) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/question`,
        question
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        //既存のキャッシュ(questions)をqueryClientのgetQueryDataを使って取得
        const previousQuestions = queryClient.getQueryData<
          Question_WithRelation[]
        >(['questions']);
        if (previousQuestions) {
          //既存のキャッシュの配列の先頭にresを追加してキャッシュを更新する
          queryClient.setQueryData(
            ['questions'],
            [res, ...previousQuestions]
          );
        }
        //ZustandのcreatingQuestionの値をreset関数(state.resetCreatingQuestion)でリセットする
        reset();
        //ページをリロードする
        window.location.reload();
      },
      onError: (err: any) => {
        reset();
        if (
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          router.push('/');
        }
      },
    }
  );

  const updateQuestionMutation = useMutation(
    async (
      question: Omit<Question_WithRelation, 'createdAt'>
    ) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/question/${question.id}`,
        question
      );
      return res.data;
    },
    {
      onSuccess: (res, variables) => {
        const previousQuestions = queryClient.getQueryData<
          Question_WithRelation[]
        >(['questions']);
        if (previousQuestions) {
          queryClient.setQueryData(
            ['questions'],
            previousQuestions.map((question) =>
              question.id === res.id ? res : question
            )
          );
        }
        window.location.reload();
      },
      onError: (err: any) => {
        if (
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          router.push('/');
        }
      },
    }
  );
  const deleteQuestionMutation = useMutation(
    async (id: number) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/question/${id}`
      );
    },
    {
      onSuccess: (_, variables) => {
        const previousQuestions = queryClient.getQueryData<
          Question_WithRelation[]
        >(['questions']);
        //variablesには非同期関数に渡した、削除したタスクのidが入っている
        if (previousQuestions) {
          queryClient.setQueryData(
            ['questions'],
            previousQuestions.filter(
              (question) => question.id !== variables
            )
          );
        }
        alert('Questionを削除しました。');
      },
      onError: (err: any) => {
        if (
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          router.push('/');
        }
      },
    }
  );
  const linkToBook_QuestionMutation: UseMutationResult<
    void,
    any,
    { questionId: number; bookId: number },
    unknown
  > = useMutation(
    async ({ questionId, bookId }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}/link`,
        { bookId: bookId }
      );
    },
    {
      onSuccess: (_, variables) => {
        window.location.reload();
      },
      onError: (err: any) => {
        if (
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          router.push('/');
        }
      },
    }
  );
  const unLinkToBook_QuestionMutation: UseMutationResult<
    void,
    any,
    { questionId: number; bookId: number },
    unknown
  > = useMutation(
    async ({ questionId, bookId }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}/unlink`,
        { bookId }
      );
    },
    {
      onSuccess: (_, variables) => {
        window.location.reload();
      },
      onError: (err: any) => {
        if (
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          router.push('/');
        }
      },
    }
  );
  //reactのコンポーネントからこれらのmutationを使えるようにreturn しておく
  return {
    createQuestionMutation,
    updateQuestionMutation,
    deleteQuestionMutation,
    linkToBook_QuestionMutation,
    unLinkToBook_QuestionMutation,
  };
};
