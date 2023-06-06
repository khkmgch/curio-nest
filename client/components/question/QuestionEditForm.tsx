import {
  Button,
  Grid,
  List,
  Loader,
  ScrollArea,
  Switch,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons';
import { FC, FormEvent, useState } from 'react';
import { useMutateQuestion } from '@/hooks/question/useMutateQuestion';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import { BookList } from '../book/BookList';
import { BookShelf } from '../book/BookShelf';
import { useSearchBook } from '@/hooks/search/useSearchBook';
import { RecommendedBookItem } from '../book/RecommendedBookItem';

type Props = {
  question: Omit<Question_WithRelation, 'createdAt'>;
  update: (payload: any) => void;
};
export const QuestionEditForm: FC<Props> = ({
  question,
  update,
}) => {
  const theme = useMantineTheme();

  //Questionを更新するメソッド
  const { updateQuestionMutation } = useMutateQuestion();
  //Questionを更新するSubmitメソッド
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateQuestionMutation.mutate({
      id: question.id,
      updatedAt: question.updatedAt,
      title: question.title,
      description: question.description,
      isPrivate: question.isPrivate,
      userId: question.userId,
      books: question.books,
      likes: question.likes,
    });
  };

  const [recommendedBooks, setRecommendedBooks] = useState<
    Array<any>
  >([]);
  const [status, setStatus] = useState<
    'none' | 'loading' | 'success'
  >('none');

  const { getRecommendedBooks } = useSearchBook();

  const handleRecommended = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (question.title !== null) {
      console.log('疑問: ', question.title);
      setStatus('loading');
      const books = await getRecommendedBooks(
        question.title
      );
      console.log('books: ', books);
      setRecommendedBooks(books);
      setStatus('success');
    }
  };

  return (
    <>
      <div className='flex justify-center '>
        <div className='w-32 lg:w-48'>
          <div className='pl-9 font-semibold text-grayish-brown-500 '>
            [紐づけされた本]
          </div>
          <BookList
            links={question.books}
            questionId={question.id}
          />
        </div>
        <div className='mx-10 bg-grayish-yellow-100 p-4 drop-shadow-2xl sm:w-96 md:w-128 lg:w-256'>
          <form onSubmit={handleUpdate}>
            <TextInput
              size='xl'
              variant='unstyled'
              mt='md'
              placeholder='title'
              //inputは入力がnullになるとエラーになるため、editingQuestion.titleがない場合の''を設定しておく
              value={question.title || ''}
              onChange={(e) =>
                update({
                  ...question,
                  title: e.target.value,
                })
              }
              styles={(theme) => ({
                root: {
                  fontSize: 28,
                },
              })}
            />
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
              checked={question.isPrivate}
              onChange={(e) =>
                update({
                  ...question,
                  isPrivate: e.currentTarget.checked,
                })
              }
            />
            <Textarea
              autosize
              minRows={15}
              size='md'
              mt='md'
              radius='md'
              placeholder='ここに、疑問の答えを書こう。'
              value={question.description || ''}
              onChange={(e) =>
                update({
                  ...question,
                  description: e.target.value,
                })
              }
            />

            <div className='mt-5 flex items-center justify-end'>
              <Button
                disabled={question.title === ''}
                color='deep-red'
                variant='filled'
                type='submit'
                styles={(theme) => ({
                  root: {
                    backgroundColor:
                      theme.colors['deep-red'][5],
                    border: 0,
                    height: 42,
                    paddingLeft: 20,
                    paddingRight: 20,

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
                更新して保存
              </Button>
            </div>
          </form>
        </div>
        <div className='w-32 lg:w-48'>
          <div className='pl-10 font-semibold text-grayish-brown-500'>
            [My本棚]
          </div>
          {question.userId !== 0 && question.id !== 0 ? (
            <BookShelf
              userId={question.userId}
              isMine={true}
              questionId={question.id}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className='my-5'>
        <form
          onSubmit={(e) => handleRecommended(e)}
          className='flex items-center justify-center'
        >
          <Button
            type='submit'
            variant='filled'
            color='bright-yellow'
          >
            AIにおすすめの本を聞く
          </Button>
        </form>
      </div>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'success' &&
        recommendedBooks &&
        recommendedBooks.length > 0 ? (
        <ScrollArea offsetScrollbars>
          <Grid
            gutter={5}
            gutterXs='md'
            gutterMd='xl'
            gutterXl={50}
          >
            {recommendedBooks.map((item) => (
              <Grid.Col span={2} key={item.id.toString()}>
                <RecommendedBookItem
                  key={item.id.toString()}
                  id={item.id}
                  info={item.volumeInfo}
                />
              </Grid.Col>
            ))}
          </Grid>
        </ScrollArea>
      ) : (
        <></>
      )}
    </>
  );
};
