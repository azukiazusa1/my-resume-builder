import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import * as NextAuth from 'next-auth/react';
import React from 'react';

import Auth from '@/lib/auth/Auth';

const pushMock = jest.fn();
const useSessitonSpy = jest.spyOn(NextAuth, 'useSession');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe('lib/auth/Auth.tsx', () => {
  beforeEach(() => {
    useSessitonSpy.mockClear();
    pushMock.mockClear();
  });

  test('ユーザーがログインしていないならログイン画面へ遷移する', () => {
    useSessitonSpy.mockImplementationOnce(
      () =>
        ({
          data: {
            user: null,
          },
          status: 'unauthenticated',
        } as any),
    );

    render(
      <Auth>
        <div>dashboard page.</div>
      </Auth>,
    );
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  test('セッションデータを取得中ならローディング画面を表示する', () => {
    useSessitonSpy.mockImplementationOnce(
      () =>
        ({
          data: {
            user: null,
          },
          status: 'loading',
        } as any),
    );

    const { getByTestId } = render(
      <Auth>
        <div>login page.</div>
      </Auth>,
    );

    expect(pushMock).not.toHaveBeenCalled();
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  test('ユーザーがログイン済なら子要素を表示する', () => {
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

    const container = render(
      <Auth>
        <div>dashboard page.</div>
      </Auth>,
    );

    expect(pushMock).not.toHaveBeenCalled();
    expect(container.getByText('dashboard page.')).toBeInTheDocument();
  });
});
