import { render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

import Edit from '@/components/model/resume/Edit';

jest.mock('next/router', () => ({
  useRouter: () => {
    return {
      query: {
        id: 'resume',
      },
    };
  },
}));

describe('components/model/resume/Edit', () => {
  test('テンプレートの持つフィールドが全て表示される', () => {
    const { getAllByTestId } = render(
      <RecoilRoot>
        <Edit />
      </RecoilRoot>,
    );

    const fields = getAllByTestId('field');

    expect(fields.length).toBe(15);
  });
});
