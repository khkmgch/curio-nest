import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios from 'axios';
import useGetCsrfToken from '@/hooks/auth/useGetCsrfToken';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '@/mantine/theme';

//プロジェクト内でreactqueryを使用できるようにするために、queryClientを作成。
//retry: REST APIへのfetchに失敗した場合に、自動的に3回までリトライを繰り返す機能
//refetchOnWindowFocus: ユーザーがブラウザにフォーカスを当てた時にREST APIへのfetchが走る機能
//2つともreactqueryに標準でついている機能で、今回は必要ないのでfalseにする。
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps,
}: AppProps) {
  //フロンドエンドとサーバーサイドでcookieのやり取りを行う場合はtrueに設定。
  axios.defaults.withCredentials = true;

  const { error } = useGetCsrfToken();

  if (error) {
    return <div>Fail to get csrf token.</div>;
  }
  return (
    //プロジェクト全体でreactqueryを使用できるようにするために、QueryClientProviderで囲む。
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Page title</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
      >
        <Component {...pageProps} />
      </MantineProvider>
      {/* reactqueryのデベロップメントツールを使用できるようにするためにReactQueryDevtoolsを追加 */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
