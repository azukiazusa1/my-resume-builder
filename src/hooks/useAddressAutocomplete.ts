import useSWR from 'swr';

import httpClient from '@/lib/httpClient';

export interface Postcode {
  /** 郵便番号 */
  postcode: string;
  /** 都道府県 */
  prefecture: string;
  /** 市区町村 */
  address: string;
  /** ふりがな */
  hiragana: string
}

const fetcher = (url: string) => httpClient.get<Postcode>(url);

const useAddressAutocomplete = (postcode: string, shouldFetch: boolean) => {
  const { data: response, error } = useSWR(shouldFetch ? `/api/postcodes?postcode=${postcode}` : null, fetcher);

  return {
    data: response?.data,
    loading: !response && !error,
    error
  };
}

export default useAddressAutocomplete;
