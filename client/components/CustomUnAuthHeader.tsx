import { Button, Header } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

export const CustomUnAuthHeader: FC = () => {
  //ホームor認証画面の場合
  return (
    <Header
      height={70}
      p='xs'
      className='flex flex-row items-center border-4 border-dark-cyan-100 bg-grayish-yellow-500'
    >
      <div className='basis-1/4  md:pl-3 lg:pl-10'>
        <Link href='/' style={{ textDecoration: 'none' }}>
          <span className='smd:text-2xl text-xl font-semibold text-grayish-brown-500 lg:text-3xl'>
            Curio Nest
          </span>
        </Link>
      </div>
      <div className='basis-1/2'> </div>
      <div className='flex basis-1/4 justify-end md:pr-3 lg:pr-10'>
        <Link
          href='/auth'
          style={{ textDecoration: 'none' }}
          className=''
        >
          <Button
            styles={(theme) => ({
              root: {
                backgroundColor:
                  theme.colors['deep-red'][5],
                border: 0,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,

                '&:hover': {
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
            Login/SignUp
          </Button>
        </Link>
      </div>
    </Header>
  );
};
