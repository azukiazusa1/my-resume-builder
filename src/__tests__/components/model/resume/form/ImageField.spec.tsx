import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { FieldProps } from '../../../../../components/model/resume/form/Form';
import ImageField from '../../../../../components/model/resume/form/ImageField';
import { server } from '../../../../../mokcs/server';

const dropFile = (inputEl: HTMLElement) => {
  window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url');
  window.URL.revokeObjectURL = jest.fn().mockImplementation(() => {});
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });

  act(() => {
    fireEvent.drop(inputEl);
  });
};

describe('ImageField component', () => {
  let props: FieldProps<string>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: '',
      onChange: jest.fn(),
    };
  });

  describe('正常系', () => {
    server.listen();
    afterEach(() => server.resetHandlers());

    test('propsで渡したlabelが設定される', () => {
      const { container } = render(<ImageField {...props} />);
      const label = container.querySelector('label');

      expect(label?.textContent).toBe('test-label');
    });

    test('valueが空の時にはimgタグが表示されない', () => {
      const { container } = render(<ImageField {...props} />);
      const img = container.querySelector('img');

      expect(img).toBeNull();
    });

    test('valueが渡された時imgタグが表示される', () => {
      const { container } = render(<ImageField {...props} value="/images/sample.png" />);
      const img = container.querySelector('img');

      expect(img).toBeDefined();
    });

    test('ファイルをドロップした後、onChangeがコールされる', async () => {
      const { getByTestId } = render(<ImageField {...props} />);
      const inputEl = getByTestId('drop-input');
      dropFile(inputEl);

      await waitFor(expect(props.onChange).toHaveBeenCalled);
    });

    test('valueが設定されているときもファイルをドロップできる', async () => {
      const { getByTestId } = render(<ImageField {...props} value="/images/sample.png" />);
      const inputEl = getByTestId('drop-input');
      dropFile(inputEl);

      await waitFor(expect(props.onChange).toHaveBeenCalled);
    });

    server.close();
  });

  describe('異常系', () => {
    const handlers = [
      rest.post('http://localhost:3000/api/upload', (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    ];

    const server = setupServer(...handlers);
    server.listen();
    afterEach(() => server.resetHandlers());

    test('ファイルアップロードに失敗した時エラーメッセージが表示される', async () => {
      const { getByTestId, findByText } = render(<ImageField {...props} />);
      const inputEl = getByTestId('drop-input');
      dropFile(inputEl);

      expect(await findByText('ファイルのアップロード時にエラーが発生しました。')).toBeDefined();
      expect(props.onChange).not.toHaveBeenCalled();
    });
    server.close();
  });
});
