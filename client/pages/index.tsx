import { NextPage } from 'next';
import { Layout } from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title='Home'>
      <div className='relative h-screen w-screen'>
        <div className='absolute left-8 top-8 text-5xl font-bold text-dark-cyan-100/50 lg:text-8xl xl:text-10xl'>
          <div>Curiosity, Book</div>
          <div>& Inspiration</div>
        </div>
        <div className='absolute left-8 lg:left-32 xl:left-48 top-44 lg:top-52 xl:top-1/2 h-1/3 w-full items-center'>
          <p className='text-3xl text-bright-blue-500 underline decoration-bright-yellow-500 decoration-4 lg:text-4xl xl:text-5xl'>
            Let&apos;s manage your daily curiosity.
          </p>
        </div>

        <div className='absolute lg:right-32 xl:left-2/3 top-1/4 w-1/3 '>
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
