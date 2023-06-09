import { Footer } from '@mantine/core';
import React from 'react';

export const CustomFooter = () => {
  return (
    <Footer
      height={60}
      p='md'
      className='border-4 border-dark-cyan-100 bg-grayish-yellow-500'
    >
      {/* <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a> */}
    </Footer>
  );
};
