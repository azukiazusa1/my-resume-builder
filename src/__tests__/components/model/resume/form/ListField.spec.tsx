import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FieldProps } from '../../../../../components/model/resume/form/Form';
import ListField from '../../../../../components/model/resume/form/ListField';

describe('ListField component', () => {
  let props: FieldProps<string[]>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: [],
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<ListField {...props} />);
    const label = container.querySelector('label');

    expect(label?.textContent).toBe('test-label');
  });

  test('テキストを入力するまで追加ボタンは無効', () => {
    const { container } = render(<ListField {...props} />);
    const button = container.querySelector('button');

    expect(button?.disabled).toBe(true);
  });

  test('テキストを入力するとボタンが有効になる', () => {
    const { container, getByTestId } = render(<ListField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;
    const button = container.querySelector('button');
    fireEvent.change(input, { target: { value: 'test2' } });

    expect(button?.disabled).toBe(false);
  });

  test('追加ボタンを押した時onChangeが呼ばれ入力は空になる', () => {
    const { container, getByTestId } = render(<ListField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;
    const button = container.querySelector('button');
    fireEvent.change(input, { target: { value: 'test2' } });
    fireEvent.click(button!);

    expect(props.onChange).toBeCalledWith(['test2']);
    expect(input.value).toBe('');
  });

  test('リスト形式でvalueが描画される', () => {
    const { container } = render(<ListField {...props} value={['1', '2', '3']} />);
    const lists = container.querySelectorAll('li');

    expect(lists.length).toBe(3);
  });

  test('削除ボタンをクリックした時onChangeが呼ばれる', () => {
    const { getAllByRole } = render(<ListField {...props} value={['1', '2', '3']} />);
    const buttons = getAllByRole('button', { name: 'delete' });
    fireEvent.click(buttons[1]);

    expect(props.onChange).toBeCalledWith(['1', '3']);
  });

  test('Enterキー押下した時入力している要素でonChangeが呼ばれる', () => {
    const { getByTestId } = render(<ListField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test2' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(props.onChange).toBeCalledWith(['test2']);
  });

  test('Enterキーを押下した時入力されていない場合なにも起こらない', () => {
    const { getByTestId } = render(<ListField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(props.onChange).not.toBeCalled();
  });
});
