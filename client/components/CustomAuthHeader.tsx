import { useQueryUser } from '@/hooks/user/useQueryUser';
import { Header, Image, Loader } from '@mantine/core';
import {
  IconClock,
  IconLogout,
  IconSearch,
} from '@tabler/icons';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  mode: string;
};
export const CustomAuthHeader: FC<Props> = ({ mode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_FOLDER;

  //ログインしているユーザー
  const { data: user, status } = useQueryUser();

  //ログアウトのメソッド
  const logout = async () => {
    //カスタムhook(useQueryUser)でapiから取得したデータをブラウザにキャッシュしていたので、
    //ログアウト時にuseQueryClientのremoveQueriesを使って、キャッシュを削除する。
    queryClient.removeQueries(['user']);
    queryClient.removeQueries(['questions']);
    queryClient.removeQueries(['books']);
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`
    );
    //ホーム画面に遷移
    router.push('/');
  };

  //ステータスがloadingの時は、Loaderコンポーネントを表示
  if (status === 'loading') return <Loader />;
  else
    return (
      <Header
        height={70}
        p='xs'
        className='flex flex-row items-center bg-white'
      >
        <div className='basis-1/4 md:pl-3 lg:pl-10'>
          <Link
            href='/plaza'
            style={{ textDecoration: 'none' }}
          >
            <span className='text-xl font-semibold text-black  md:text-2xl  lg:text-3xl'>
              Qu Back
            </span>
          </Link>
        </div>
        <div className='flex basis-1/2 flex-row items-center justify-center'>
          <Link
            href='/plaza'
            className='flex items-center justify-center'
          >
            <IconClock
              size={40}
              className='hover:text-custom-blue-4 cursor-pointer text-gray-300'
            />
          </Link>
          <Link
            href={`/profile/${user?.id}`}
            className='mx-5 flex items-center justify-center'
          >
            <Image
              src={
                user?.profilePicture
                  ? PUBLIC_FOLDER +
                    '/' +
                    user.profilePicture
                  : PUBLIC_FOLDER + '/person/noAvatar.png'
              }
              alt=''
              className='hover:outline-custom-blue-4 cursor-pointer rounded-full outline outline-2 outline-offset-2 outline-gray-300'
              radius='xl'
              width={30}
              height={30}
              fit='cover'
            />
          </Link>
          <Link
            href='/search'
            className='flex items-center justify-center'
          >
            <IconSearch
              size={40}
              className='hover:text-custom-blue-4 cursor-pointer text-gray-300'
            />
          </Link>
        </div>
        <div className='flex basis-1/4 justify-end md:pr-3 lg:pr-10'>
          <IconLogout
            size={40}
            className='hover:text-custom-blue-4 cursor-pointer text-gray-300'
            onClick={logout}
          />
        </div>
      </Header>
    );
};
