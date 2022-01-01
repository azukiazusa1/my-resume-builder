import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import AddressField from '@/components/model/resume/form/AddressField';
import { FieldProps } from '@/components/model/resume/form/Form';
import { server } from '@/mokcs/server';
import { AddressFieldValue } from '@/store/templateState/types';

describe('components/model/resume/form/CheckboxField', () => {
  let props: FieldProps<AddressFieldValue>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: undefined,
      onChange: jest.fn(),
    };
  });

  describe('正常系', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('propsで渡したlabelが設定される', () => {
      const { getByText } = render(<AddressField {...props} />);
      expect(getByText('test-label')).toBeInTheDocument();
    });

    test('propsで渡したvalueが設定される', () => {
      const { getByTestId } = render(
        <AddressField
          {...props}
          value={{
            postCodeFirst: '111',
            postCodeLast: '2222',
            ruby: 'とうきょうとしぶやく',
            prefecture: '東京都',
            address: '渋谷区',
          }}
        />,
      );

      const postCodeFirst = getByTestId('postCodeFirst');
      const postCodeLast = getByTestId('postCodeLast');
      const ruby = getByTestId('ruby');
      const prefecture = getByTestId('prefecture');
      const address = getByTestId('address');

      expect(postCodeFirst).toHaveValue('111');
      expect(postCodeLast).toHaveValue('2222');
      expect(ruby).toHaveValue('とうきょうとしぶやく');
      expect(prefecture).toHaveValue('東京都');
      expect(address).toHaveValue('渋谷区');
    });

    test('郵便番号の前半を入力した時onChangeが呼ばれる', () => {
      const { getByTestId } = render(<AddressField {...props} />);
      const postCodeFirst = getByTestId('postCodeFirst');

      fireEvent.change(postCodeFirst, { target: { value: '111' } });

      expect(props.onChange).toBeCalledWith(
        expect.objectContaining({
          postCodeFirst: '111',
        }),
      );
    });

    test('郵便番号の後半を入力した時onChangeが呼ばれる', () => {
      const { getByTestId } = render(<AddressField {...props} />);
      const postCodeLast = getByTestId('postCodeLast');

      fireEvent.change(postCodeLast, { target: { value: '2222' } });

      expect(props.onChange).toBeCalledWith(
        expect.objectContaining({
          postCodeLast: '2222',
        }),
      );
    });

    test('ふりがなを入力した時onChangeが呼ばれる', () => {
      const { getByTestId } = render(<AddressField {...props} />);
      const ruby = getByTestId('ruby');

      fireEvent.change(ruby, { target: { value: 'とうきょうとしぶやく' } });

      expect(props.onChange).toBeCalledWith(
        expect.objectContaining({
          ruby: 'とうきょうとしぶやく',
        }),
      );
    });

    test('都道府県を入力した時onChangeが呼ばれる', () => {
      const { getByTestId } = render(<AddressField {...props} />);
      const autocomplete = getByTestId('autocomplete');
      const input = getByTestId('prefecture');
      autocomplete.focus();

      fireEvent.change(input, { target: { value: '北海道' } });
      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
      fireEvent.keyDown(autocomplete, { key: 'Enter' });

      expect(props.onChange).toBeCalledWith(
        expect.objectContaining({
          prefecture: '北海道',
        }),
      );
    });

    test('都道府県をクリアしたとき空文字でonChangeが呼ばれる', () => {
      const { getByTestId } = render(
        <AddressField
          {...props}
          value={{
            postCodeFirst: '111',
            postCodeLast: '2222',
            ruby: 'とうきょうとしぶやく',
            prefecture: '東京都',
            address: '渋谷区',
          }}
        />,
      );
      const clear = getByTestId('CloseIcon');

      fireEvent.click(clear);

      expect(props.onChange).toBeCalledWith(
        expect.objectContaining({
          prefecture: '',
        }),
      );
    });

    test('住所を入力した時onChangeが呼ばれる', () => {
      const { getByTestId } = render(<AddressField {...props} />);
      const address = getByTestId('address');

      fireEvent.change(address, { target: { value: '渋谷区' } });

      expect(props.onChange).toBeCalledWith(
        expect.objectContaining({
          address: '渋谷区',
        }),
      );
    });

    test('郵便番号がどちらも入力されるまで「自動入力」ボタンは無効', async () => {
      const { getByText, rerender } = render(<AddressField {...props} />);
      expect(getByText('自動入力')).toBeDisabled();

      rerender(<AddressField {...props} value={{ postCodeFirst: '111' }} />);
      expect(getByText('自動入力')).toBeDisabled();

      rerender(<AddressField {...props} value={{ postCodeLast: '2222' }} />);
      expect(getByText('自動入力')).toBeDisabled();

      rerender(<AddressField {...props} value={{ postCodeFirst: '111', postCodeLast: '2222' }} />);
      await waitFor(() => {
        expect(getByText('自動入力')).not.toBeDisabled();
      });

      rerender(<AddressField {...props} value={{ postCodeFirst: '11', postCodeLast: '2222' }} />);
      expect(getByText('自動入力')).toBeDisabled();

      rerender(<AddressField {...props} value={{ postCodeFirst: '111', postCodeLast: '222' }} />);
      expect(getByText('自動入力')).toBeDisabled();
    });

    test('自動入力をクリックしたとき都道府県,ふりがな,住所でonChangeが呼ばれる', async () => {
      const { getByText } = render(
        <AddressField {...props} value={{ postCodeFirst: '111', postCodeLast: '2222' }} />,
      );
      await waitFor(() => fireEvent.click(getByText('自動入力')));

      expect(props.onChange).toBeCalledWith(
        expect.objectContaining({
          prefecture: '東京都',
          ruby: 'とうきょうとしぶやく',
          address: '渋谷区',
        }),
      );
    });
  });

  describe('異常系', () => {
    const handlers = [
      rest.get('http://localhost:3000/api/postcodes', (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    ];

    const server = setupServer(...handlers);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('住所の取得時にエラーが発生したときエラーメッセージを表示する', async () => {
      const { getByText } = render(
        <AddressField {...props} value={{ postCodeFirst: '333', postCodeLast: '4444' }} />,
      );
      await waitFor(() => getByText('住所の取得時にエラーが発生しました。'));
    });
  });
});
