import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import * as NextAuth from 'next-auth/react';
import React from 'react';

import Header from '@/components/layout/Header';

const useSessitonSpy = jest.spyOn(NextAuth, 'useSession');

describe('components/layout/Header', () => {
  beforeEach(() => {
    useSessitonSpy.mockClear();
  });

  test('ログインしていないならログインボタンが表示される', () => {
    useSessitonSpy.mockImplementationOnce(
      () =>
        ({
          data: {
            user: null,
          },
          status: 'unauthenticated',
        } as any),
    );

    const { getByText, queryByTestId } = render(<Header />);
    expect(getByText('Log in')).toBeInTheDocument();
    expect(queryByTestId('user avatar')).not.toBeInTheDocument();
  });

  test('ログイン済の場合ユーザーアバターを表示する', () => {
    useSessitonSpy.mockImplementationOnce(
      () =>
        ({
          data: {
            user: {
              id: '1',
              name: 'test',
              avatar: 'https://example.com/avatar.png',
            },
          },
          status: 'authenticated',
        } as any),
    );

    const { queryByText, getByTestId } = render(<Header />);
    expect(queryByText('Log in')).not.toBeInTheDocument();
    expect(getByTestId('user-avatar')).toBeInTheDocument();
  });
});
