import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

import FieldMenu from '@/components/model/resume/field/FieldMenu';

describe('components/model/resume/field/FieldMenu', () => {
  test('三点リーダーをクリックするとメニューが表示される', () => {
    const { getByRole, queryByRole } = render(
      <RecoilRoot>
        <FieldMenu id="resume" fieldId="name" />
      </RecoilRoot>,
    );

    expect(queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(getByRole('button'));
    expect(getByRole('menu')).toBeInTheDocument();
  });

  test('「編集」をクリックすると編集ダイアログが表示される', () => {
    const { getByText, getByRole } = render(
      <RecoilRoot>
        <FieldMenu id="resume" fieldId="name" />
      </RecoilRoot>,
    );

    fireEvent.click(getByRole('button'));

    fireEvent.click(getByText('編集'));

    expect(getByText('フィールドを編集')).toBeInTheDocument();
  });

  test('「削除」をクリックすると確認ダイアログが表示される', () => {
    const { getByText, getByRole } = render(
      <RecoilRoot>
        <FieldMenu id="resume" fieldId="name" />
      </RecoilRoot>,
    );

    fireEvent.click(getByRole('button'));

    fireEvent.click(getByText('削除'));

    expect(getByText('フィールドを削除しますか？')).toBeInTheDocument();
  });
});
