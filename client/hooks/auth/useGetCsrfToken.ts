import { useEffect, useState } from 'react';
import axios from 'axios';

interface IResponse {
  data: string | null;
  error: any;
}

const useGetCsrfToken = () => {
  const [res, setRes] = useState<IResponse>({
    data: null,
    error: null,
  });

  const getCsrfToken: () => Promise<void> = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      console.log('token : ', data);
      //axiosで、headerにcsrf-tokenという名前を付けてトークンを設定。
      //これにより、これ以降REST APIにリクエストを送るときには、headerにCsrf Tokenが付与されるようになる。
      axios.defaults.headers.common['csrf-token'] =
        data.csrfToken;
      setRes({ data, error: null });
    } catch (error) {
      console.error(error);
      setRes({ data: null, error });
    }
  };
  useEffect(() => {
    getCsrfToken();
  }, []);

  return res;
};

export default useGetCsrfToken;
