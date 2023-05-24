// zustandを使って状態管理を行う

import { CreatingQuestion } from '@/types/question/creating-question.type';
import { EditingQuestion } from '@/types/question/editing-question.type';
import { StoreApi, UseBoundStore, create } from 'zustand';

type State = {
  //新規作成中のQuestion
  creatingQuestion: CreatingQuestion;
  updateCreatingQuestion: (
    payload: CreatingQuestion
  ) => void;
  resetCreatingQuestion: () => void;

  //編集中のQuestion
  editingQuestion: EditingQuestion;
  updateEditingQuestion: (payload: EditingQuestion) => void;
};

//ステートcreatingQuestion,editingQuestion(初期値)
//更新関数updateEditingQuestionとresetEditingQuestionを定義
export const useStore: UseBoundStore<StoreApi<State>> =
  create<State>((set) => ({
    //新規作成中のQuestion
    creatingQuestion: { title: '', isPrivate: false },
    updateCreatingQuestion: (payload) =>
      set({
        creatingQuestion: {
          title: payload.title,
          isPrivate: payload.isPrivate,
        },
      }),
    resetCreatingQuestion: () =>
      set({
        creatingQuestion: {
          title: '',
          isPrivate: false,
        },
      }),

    //編集中のQuestion
    editingQuestion: {
      id: 0,
      title: '',
      description: '',
      isPrivate: false,
      books: [],
      likes: [],
    },
    updateEditingQuestion: (payload) =>
      set({
        editingQuestion: {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          isPrivate: payload.isPrivate,
          books: payload.books,
          likes: payload.likes,
        },
      }),
  }));
