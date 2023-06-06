import { FormEvent } from 'react';
import {
  TextInput,
  Button,
  Center,
  Switch,
  useMantineTheme,
} from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons';
import { useStore } from '@/store/useStore';
import { useMutateQuestion } from '@/hooks/question/useMutateQuestion';

export const QuestionCreateForm = () => {
  const theme = useMantineTheme();

  //メソッド

  //useStoreからcreatingQuestionを取り出す
  const { creatingQuestion } = useStore();
  //useStoreからupdateCreatingQuestionを取り出す
  const update = useStore(
    (state) => state.updateCreatingQuestion
  );
  //useMutateQuestionから読み込む
  const { createQuestionMutation } = useMutateQuestion();

  //Questionを新規作成するSubmitメソッド
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createQuestionMutation.mutate({
      title: creatingQuestion.title,
      isPrivate: creatingQuestion.isPrivate,
    });
  };
  return (
    <div className='md:w-192 m-4 flex h-56 w-4/5 flex-col bg-grayish-yellow-100 p-4 drop-shadow-2xl '>
      <form onSubmit={handleSubmit}>
        <Switch
          size='md'
          color={
            theme.colorScheme === 'dark'
              ? 'bright-yellow'
              : 'bright-yellow'
          }
          onLabel={
            <IconLock
              size={16}
              stroke={2.5}
              color={theme.colors['bright-blue'][4]}
            />
          }
          offLabel={
            <IconLockOpen
              size={16}
              stroke={2.5}
              color={theme.colors['bright-yellow'][3]}
            />
          }
          checked={creatingQuestion.isPrivate}
          onChange={(e) =>
            update({
              ...creatingQuestion,
              isPrivate: e.currentTarget.checked,
            })
          }
        />
        <TextInput
          className='h-20 '
          size='lg'
          mt='md'
          placeholder='今、気になっていることは？'
          variant='unstyled'
          //inputは入力がnullになるとエラーになるため、creatingQuestion.titleがない場合の''を設定しておく
          value={creatingQuestion.title || ''}
          onChange={(e) =>
            update({
              ...creatingQuestion,
              title: e.target.value,
            })
          }
        />
        <hr className='h-0.5 border-0 bg-dark-cyan-100' />

        <Center mt='lg'>
          <Button
            disabled={creatingQuestion.title === ''}
            type='submit'
            styles={(theme) => ({
              root: {
                backgroundColor:
                  theme.colors['deep-red'][5],
                border: 0,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,

                ':disabled': {
                  backgroundColor: theme.fn.lighten(
                    theme.colors['deep-red'][7],
                    0.05
                  ),
                },
                ':hover': {
                  backgroundColor: theme.fn.lighten(
                    theme.colors['deep-red'][3],
                    0.05
                  ),
                },
              },

              leftIcon: {
                marginRight: 15,
              },
            })}
          >
            作成
          </Button>
        </Center>
      </form>
    </div>
  );
};
