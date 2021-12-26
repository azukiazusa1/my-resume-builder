import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FieldProps } from '../../../../../components/model/resume/form/Form';
import ShortTextField from '../../../../../components/model/resume/form/ShortTextField';

describe('ShortTextField component', () => {
  let props: FieldProps<string>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: 'test',
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<ShortTextField {...props} />);
    const label = container.querySelector('label');

    expect(label?.textContent).toBe('test-label');
  });

  test('propsで渡したvalueが設定される', () => {
    const { getByTestId } = render(<ShortTextField {...props} />);
    const input = getByTestId('shortText') as HTMLInputElement;

    expect(input.value).toBe('test');
  });

  test('フォームに入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(<ShortTextField {...props} />);
    const input = getByTestId('shortText') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test2' } });

    expect(props.onChange).toBeCalledWith('test2');
  });
});
