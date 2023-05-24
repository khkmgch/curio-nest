import { FC, useEffect, useState } from 'react';
import { Image, List } from '@mantine/core';
import {
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { useStore } from '@/store/useStore';
import { useMutateQuestion } from '@/hooks/question/useMutateQuestion';
import Link from 'next/link';
import { Question_WithRelation } from '@/types/prisma-extended/question-with-relation.type';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ja from 'timeago.js/lib/lang/ja';
import { IconCopy } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useGetUser } from '@/hooks/user/useGetUser';

type Props = Omit<Question_WithRelation, 'updatedAt'> & {
  isMine: boolean;
};
export const QuestionItem: FC<Props> = ({
  id,
  title,
  description,
  isPrivate,
  createdAt,
  books,
  likes,
  userId,
  isMine,
}) => {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_FOLDER;
  const router = useRouter();
  timeago.register('ja', ja);

  //状態

  //Questionを作成したユーザー
  const [questionUser, setQuestionUser] = useState<{
    userName: string | null;
    profilePicture: string | null;
  }>({
    userName: '',
    profilePicture: '',
  });

  //メソッド

  //useStoreのCreatingQuestionとEditingQuestionを更新するメソッド
  const updateCreating = useStore(
    (state) => state.updateCreatingQuestion
  );
  const updateEditing = useStore(
    (state) => state.updateEditingQuestion
  );

  //Questionを削除するメソッド
  const { deleteQuestionMutation } = useMutateQuestion();

  //Questionを作成したユーザーを取得するメソッド
  const { getUserById } = useGetUser();

  useEffect(() => {
    //コンポーネントの状態を初期設定するメソッド
    const init = async () => {
      const user = await getUserById(userId);
      if (user) {
        setQuestionUser({
          userName: user.userName,
          profilePicture: user.profilePicture,
        });
      }
    };
    init();
  }, []);

  return (
    <List.Item className='my-4 flex w-full flex-col  bg-white p-3 md:h-56 md:p-4'>
      <div className='flex  h-12 items-center '>
        <Link
          href={`/profile/${userId}`}
          className='mx-5 flex items-center justify-center'
        >
          <Image
            radius='xl'
            width={40}
            height={40}
            fit='cover'
            src={
              questionUser?.profilePicture
                ? PUBLIC_FOLDER +
                  '/' +
                  questionUser.profilePicture
                : PUBLIC_FOLDER + '/person/noAvatar.png'
            }
            alt=''
            className='hover:outline-custom-blue-4 ml-1 mr-2 cursor-pointer rounded-full outline outline-2 outline-offset-2 outline-gray-300'
          />
        </Link>
        <div className='flex flex-col'>
          <h4 className='text-custom-blue-4 my-1'>
            {questionUser?.userName}
          </h4>

          <TimeAgo
            datetime={createdAt}
            locale='ja'
            className='text-custom-blue-2'
          />
        </div>
      </div>
      <div className='h-28  px-3 py-5'>
        <span className='text-md md:text-lg'>{title}</span>
      </div>

      <div className='flex h-8 items-start justify-end  pt-1'>
        {isMine ? (
          <>
            <Link href={`/question/${id}`}>
              <PencilAltIcon
                className='text-custom-blue-2 hover:text-custom-blue-4 mx-1 h-6 w-6 cursor-pointer'
                //クリックされた時に、Zustandのid, title, descriptionの値を現在フォーカスしているQuestionItemの値に書き換える
                onClick={() => {
                  updateEditing({
                    id,
                    title,
                    description,
                    isPrivate,
                    books,
                    likes,
                  });
                }}
              />
            </Link>
            <TrashIcon
              className='text-custom-blue-2 hover:text-custom-blue-4 h-6 w-6 cursor-pointer'
              onClick={() => {
                deleteQuestionMutation.mutate(id);
              }}
            />
          </>
        ) : (
          <IconCopy
            className='h-6 w-6 cursor-pointer text-gray-500 hover:text-teal-500'
            onClick={() => {
              updateCreating({
                title: title,
                isPrivate: false,
              });
              router.push('/plaza');
            }}
          />
        )}
      </div>
    </List.Item>
  );
};