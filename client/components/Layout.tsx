import { AppShell } from '@mantine/core';
import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import { CustomFooter } from './CustomFooter';
import { CustomAuthHeader } from './CustomAuthHeader';
import { CustomUnAuthHeader } from './CustomUnAuthHeader';

type Props = {
  title: string;
  children: ReactNode;
};

export const Layout: FC<Props> = ({
  children,
  title = 'Nextjs',
}) => {
  return (
    <AppShell
      padding='md'
      header={
        title === 'Home' || title === 'Auth' ? (
          <CustomUnAuthHeader />
        ) : (
          <CustomAuthHeader mode={title} />
        )
      }
      footer={<CustomFooter />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colors['grayish-yellow'][4],
        },
      })}
    >
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <Head>
          <title>{`${title} | Curio Nest`}</title>
        </Head>
        <main className='flex w-screen flex-1 flex-col items-center justify-center'>
          {children}
        </main>
      </div>
    </AppShell>
  );
};
