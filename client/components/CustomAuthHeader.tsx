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
  console.log('loginUser: ', user);

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
        className='flex flex-row items-center border-4 border-dark-cyan-100 bg-grayish-yellow-500'
      >
        <div className='basis-1/4 md:pl-3 lg:pl-10'>
          <Link
            href='/plaza'
            style={{ textDecoration: 'none' }}
          >
            <span className='smd:text-2xl text-xl font-semibold text-grayish-brown-500 lg:text-3xl'>
              Curio Nest
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
              className={`cursor-pointer ${
                mode === 'Plaza'
                  ? 'text-bright-yellow-500'
                  : 'text-grayish-brown-200'
              }`}
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
              className={`outline-3 outline-offset-3 cursor-pointer rounded-full outline  ${
                mode === 'Profile'
                  ? 'outline-bright-yellow-500'
                  : 'outline-grayish-brown-200'
              }`}
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
              className={`cursor-pointer  ${
                mode === 'Search'
                  ? 'text-bright-yellow-500'
                  : 'text-grayish-brown-200'
              }`}
            />
          </Link>
        </div>
        <div className='flex basis-1/4 justify-end md:pr-3 lg:pr-10'>
          <IconLogout
            size={40}
            className='cursor-pointer text-grayish-brown-200 hover:text-deep-red-500'
            onClick={logout}
          />
        </div>
      </Header>
    );
};
