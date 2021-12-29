import React from 'react';
import Guest from '@/lib/auth/Guest';
import * as NextAuth from 'next-auth/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const pushMock = jest.fn();
const useSessitonSpy = jest.spyOn(NextAuth, 'useSession');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe('lib/auth/Guest.tsx', () => {
  beforeEach(() => {
    useSessitonSpy.mockClear();
    pushMock.mockClear();
  });

  test('ユーザーがログインしていないなら子要素を表示する', () => {
    useSessitonSpy.mockImplementationOnce(
      () =>
        ({
          data: {
            user: null,
          },
          status: 'unauthenticated',
        } as any),
    );

    const { getByText } = render(
      <Guest>
        <div>login page.</div>
      </Guest>,
    );
    expect(pushMock).not.toHaveBeenCalled();
    expect(getByText('login page.')).toBeInTheDocument();
  });

  test('セッションデータを取得中は子要素を表示する', () => {
    useSessitonSpy.mockImplementationOnce(
      () =>
        ({
          data: {
            user: null,
          },
          status: 'loading',
        } as any),
    );

    const { getByText } = render(
      <Guest>
        <div>login page.</div>
      </Guest>,
    );

    expect(pushMock).not.toHaveBeenCalled();
    expect(getByText('login page.')).toBeInTheDocument();
  });

  test('ユーザーがログイン済ならダッシュボード画面へ遷移する', () => {
    useSessitonSpy.mockImplementationOnce(
      () =>
        ({
          data: {
            user: {
              email: '',
              name: '',
              image: '',
            },
          },
          status: 'authenticated',
        } as any),
    );

    render(
      <Guest>
        <div>login page.</div>
      </Guest>,
    );

    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });
});
