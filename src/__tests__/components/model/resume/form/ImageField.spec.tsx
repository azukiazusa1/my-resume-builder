import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { FieldProps } from '@/components/model/resume/form/Form';
import ImageField from '@/components/model/resume/form/ImageField';
import { server } from '@/mokcs/server';
import { ImageFieldOptions } from '@/store/templateState/types';

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

let mockValue: string | undefined = undefined;

jest.mock('@/store/filedValueState', () => ({
  fieldValueSelectors: {
    useFieldValueItem: jest.fn(() => mockValue),
  },
}));

describe('ImageField component', () => {
  let props: FieldProps<string, ImageFieldOptions>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      templateId: 'test-template-id',
      fieldId: 'test-field-id',
      onChange: jest.fn(),
      options: {
        width: 120,
        height: 150,
      },
    };
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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
    mockValue = '/images/sample.png';
    const { container } = render(<ImageField {...props} />);
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
    mockValue = '/images/sample.png';
    const { getByTestId } = render(<ImageField {...props} />);
    const inputEl = getByTestId('drop-input');
    dropFile(inputEl);

    await waitFor(expect(props.onChange).toHaveBeenCalled);
  });

  test('ファイルアップロードに失敗した時エラーメッセージが表示される', async () => {
    server.use(
      rest.post('http://localhost:3000/api/upload', (_, res, ctx) => {
        return res.once(ctx.status(500));
      }),
    );
    const { getByTestId, findByText } = render(<ImageField {...props} />);
    const inputEl = getByTestId('drop-input');
    dropFile(inputEl);

    expect(await findByText('ファイルのアップロード時にエラーが発生しました。')).toBeDefined();
    expect(props.onChange).not.toHaveBeenCalled();
  });
});
