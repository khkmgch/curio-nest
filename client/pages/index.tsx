import {
  IconBook,
  IconBulb,
  IconCornerRightDown,
  IconQuestionMark,
} from '@tabler/icons';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title='Home'>
      <div className='relative h-screen w-screen'>
        <div className='absolute left-24 top-8 text-10xl font-bold text-dark-cyan-100/50'>
          <div>Curiosity, Book</div>
          <div>& Inspiration</div>
        </div>
        <div className='flex h-1/3 w-full items-center justify-center'>
          <p className='absolute left-48 top-1/2 text-5xl text-bright-blue-500 underline decoration-bright-yellow-500 decoration-4'>
            Let's manage your daily curiosity.
          </p>
        </div>

        <div className='absolute left-2/3 top-1/4 w-1/3 '>
          <img
            src='/home-logo.png'
            alt='logo'
            className='object-contain'
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
