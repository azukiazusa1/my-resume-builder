import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FieldProps } from '../../../../../components/model/resume/form/Form';
import LongTextField from '../../../../../components/model/resume/form/LongTextField';

describe('LongTextField component', () => {
  let props: FieldProps<string>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: 'test',
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<LongTextField {...props} />);
    const label = container.querySelector('label');

    expect(label?.textContent).toBe('test-label');
  });

  test('propsで渡したvalueが設定される', () => {
    const { getByTestId } = render(<LongTextField {...props} />);
    const input = getByTestId('longText') as HTMLInputElement;

    expect(input.value).toBe('test');
  });

  test('フォームに入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(<LongTextField {...props} />);
    const input = getByTestId('longText') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test2' } });

    expect(props.onChange).toBeCalledWith('test2');
  });
});
