import type {
  UseInfiniteQueryResult,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { baseUrl } from '@/libs/setting';
import useUserInfoStore from '@/zustand/userStore';
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const api = async (method: Method, url: string, obj = {}) => {
  const logout = useUserInfoStore.getState().logout;

  const token = useUserInfoStore.getState().userInfo.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let response: AxiosResponse<any, any>;
    // // let fullUrl = `${baseUrl}/${url}`
    // // let getUrl = `${process.env.NEXT_PUBLIC_API1_URL}/${url}`
    //   let fullUrl = `${baseUrl}/v1/${url}`
    // let getUrl = `${baseUrl}/api/${url}`
    let fullUrl: string;
    let getUrl: string;

    if (process.env.NODE_ENV === 'production') {
      fullUrl = `${baseUrl}/${url}`;
      getUrl = `${process.env.NEXT_PUBLIC_API1_URL}/${url}`;
    } else {
      fullUrl = `${baseUrl}/v1/${url}`;
      getUrl = `${process.env.NEXT_PUBLIC_API1_URL}/${url}`;
    }

    switch (method) {
      case 'GET':
        response = await axios.get(getUrl, config);
        break;
      case 'POST':
        response = await axios.post(fullUrl, obj, config);
        break;
      case 'PUT':
        response = await axios.put(fullUrl, obj, config);
        break;
      case 'DELETE':
        response = await axios.delete(fullUrl, config);
        break;
      default:
        return `Unsupported method: ${method}`;
    }
    return response.data;
  } catch (error: any) {
    const err = error?.response?.data?.message || error?.message || 'Something went wrong';
    const expectedErrors = ['invalid signature', 'jwt expired', 'Unauthorized'];
    if (expectedErrors.includes(err)) {
      logout();
    }
    throw err;
  }
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ApiHookParams = {
  key: string[];
  method: Method;
  url: string;
};

export default function ApiCall({ key, method, url }: ApiHookParams) {
  const queryClient = new QueryClient();

  // Define hooks unconditionally
  const getQuery: UseQueryResult<any, string> = useQuery({
    queryKey: key,
    queryFn: () => api('GET', url),
    retry: 0,
    enabled: method === 'GET',
  });

  const postMutation: UseMutationResult<any, string, any> = useMutation({
    mutationFn: (obj: any) => api('POST', url, obj),
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const putMutation: UseMutationResult<any, string, any> = useMutation({
    mutationFn: (obj: any) => api('PUT', `${url}/${obj?.id}`, obj),
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const deleteMutation: UseMutationResult<any, string, string> = useMutation({
    mutationFn: (id: string) => api('DELETE', `${url}/${id}`),
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  // Return the appropriate hook result based on the method
  switch (method) {
    case 'GET':
      return { get: getQuery };
    case 'POST':
      return { post: postMutation };
    case 'PUT':
      return { put: putMutation };
    case 'DELETE':
      return { delete: deleteMutation };
    default:
      throw new Error(`Invalid method ${method}`);
  }
}

export const ApiInfiniteCall = ({ key, url }: ApiHookParams) => {
  const infinite: UseInfiniteQueryResult<any, string> = useInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) => api('GET', `${url}&page=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.endIndex < lastPage.total) {
        return pages.length + 1; // This assumes that pages are 1-indexed
      }
      return undefined;
    },
    retry: 0,
  });

  return { infinite };
};
