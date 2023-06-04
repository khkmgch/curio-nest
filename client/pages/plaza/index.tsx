import { NextPage } from 'next';
import { Layout } from '../../components/Layout';
import { useQueryUser } from '../../hooks/user/useQueryUser';
import {
  Loader,
  Switch,
  useMantineTheme,
} from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';
import { useToggle } from '@/hooks/useToggle';
import { QuestionCreateForm } from '@/components/question/QuestionCreateForm';
import { QuestionAllList } from '@/components/question/QuestionAllList';
import { QuestionList } from '@/components/question/QuestionList';

const Plaza: NextPage = () => {
  const theme = useMantineTheme();

  //ログインしているユーザー
  const { data: user, status } = useQueryUser();

  //タイムラインの表示コンテンツを切り替えるための状態<boolean>(全員or友達のみ)
  const { state, toggle } = useToggle();

  if (status === 'loading') {
    return (
      <Layout title='Plaza'>
        <Loader />
      </Layout>
    );
  } else
    return (
      <Layout title='Plaza'>
        <div className='flex flex-col items-center w-full'>
          <QuestionCreateForm />
          <Switch
          className='mt-5'
            size='md'
            label={state ? '全員' : '友達のみ'}
            color={
              theme.colorScheme === 'dark'
                ? 'bright-yellow'
                : 'bright-yellow'
            }
            onLabel={
              <IconUserPlus
                size={16}
                stroke={2.5}
                color={theme.colors['bright-blue'][4]}
              />
            }
            offLabel={
              <IconUserPlus
                size={16}
                stroke={2.5}
                color={theme.colors['bright-yellow'][3]}
              />
            }
            checked={state}
            onChange={toggle}
          />
          {state ? (
            <QuestionAllList />
          ) : typeof user?.id !== 'undefined' ? (
            <QuestionList
              isTimeline={true}
              isMine={true}
              userId={user?.id}
            />
          ) : (
            <Loader />
          )}
        </div>
      </Layout>
    );
};

export default Plaza;
