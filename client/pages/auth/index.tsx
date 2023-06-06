import { ExclamationCircleIcon } from '@heroicons/react/solid';
import {
  Alert,
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { Layout } from '../../components/Layout';
import { useAuth } from '@/hooks/auth/useAuth';
import { AuthForm } from '@/types/auth/auth-form.type';

//入力フォームのバリデーションのため、Yupのスキーマを定義
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('No email provided'),
  password: Yup.string()
    .required('No password provided')
    .min(8, 'Password should be min 8 chars'),
});

const Auth: NextPage = () => {
  //ルーティング
  const router = useRouter();

  //状態

  //ログインモードと新規登録モードを切り替えるためのisRegister(デフォルトはfalseでログインモード)
  const [isRegister, setIsRegister] = useState(false);

  //エラーメッセージ
  const [error, setError] = useState('');

  //mantineのuseForm
  //ジェネリクスでフォームのデータ型（types/index.tsで定義したAuthForm）に指定
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  //メソッド

  //新規登録・ログインを切り替えるメソッド
  const switchMode = () => {
    setIsRegister((prevState) => !prevState);
    //登録とログインを切り替えた時に何らかのエラーが発生していれば、エラーをリセット
    setError('');
  };

  //新規登録とログインのメソッド
  const { register, login } = useAuth();

  const handleSubmit = async () => {
    try {
      //新規登録モードの場合、登録が成功したら続いてログインも行う
      if (isRegister) {
        await register({
          email: form.values.email,
          password: form.values.password,
        });
      }
      await login({
        email: form.values.email,
        password: form.values.password,
      });

      //useFormのresetメソッドで初期値にリセット
      form.reset();
      //ダッシュボードに遷移
      router.push('/plaza');
    } catch (error) {
      //setErrorでerrorステートにエラーメッセージを格納
      setError('error');
    }
  };
  return (
    <Layout title='Auth'>
      <div className='flex h-screen w-screen flex-col items-center justify-center '>
        <div className='mb-5 text-3xl font-semibold text-grayish-brown-500'>
          Welcome to Curio Nest
        </div>
        <div className='flex flex-col items-center justify-center rounded-md bg-grayish-yellow-100  p-10 drop-shadow-2xl'>
          {/* errorに何らかの文字列が存在する場合にアラートを表示 */}
          {error && (
            <Alert
              my='md'
              variant='filled'
              icon={<ExclamationCircleIcon />}
              title='Authorization Error'
              color='red'
              radius='md'
            >
              {error}
            </Alert>
          )}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              mt='md'
              size='md'
              id='email'
              label='メールアドレス'
              withAsterisk
              placeholder='example@gmail.com'
              //useFormのgetInputPropsを使う。(value, onChange, useStateを使わなくて済む)
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt='md'
              size='md'
              id='password'
              label='パスワード'
              withAsterisk
              placeholder='password'
              description='8文字以上'
              {...form.getInputProps('password')}
            />
            <Group mt='xl' position='apart'>
              <Anchor
                // テキストをクリックできるようにしたいのでcomponentとtypeをbuttonに設定
                component='button'
                type='button'
                size='sm'
                className='text-bright-blue-500'
                onClick={() => {
                  switchMode();
                }}
              >
                {isRegister
                  ? 'アカウントをお持ちの方はこちら'
                  : '新しくアカウントを作成したい方はこちら'}
              </Anchor>
              <Button
                type='submit'
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
                {isRegister ? '登録' : 'ログイン'}
              </Button>
            </Group>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Auth;
