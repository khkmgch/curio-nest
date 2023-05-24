import { Button, Header } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  mode: string;
};
export const CustomUnAuthHeader: FC<Props> = ({ mode }) => {
  //ホームor認証画面の場合
  return (
    <Header
      height={70}
      p='xs'
      className='flex flex-row items-center bg-white'
    >
      <div className='basis-1/4  md:pl-3 lg:pl-10'>
        <Link href='/' style={{ textDecoration: 'none' }}>
          <span className='text-xl font-semibold text-black  md:text-2xl  lg:text-3xl'>
            Qu Back
          </span>
        </Link>
      </div>
      <div className='basis-1/2'> </div>
      <div className='flex basis-1/4 justify-end  md:pr-3 lg:pr-10'>
        <Link
          href='/auth'
          style={{ textDecoration: 'none' }}
          className=''
        >
          <Button
            styles={(theme) => ({
              root: {
                backgroundColor: '#EBB52F',
                border: 0,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,

                '&:hover': {
                  backgroundColor: theme.fn.darken(
                    '#EBB52F',
                    0.05
                  ),
                },
              },

              leftIcon: {
                marginRight: 15,
              },
            })}
          >
            ログイン/新規登録
          </Button>
        </Link>
      </div>
    </Header>
  );
};
