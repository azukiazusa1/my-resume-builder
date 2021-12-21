import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FieldProps } from '../../../../../components/model/resume/form/Form';
import NumberField from '../../../../../components/model/resume/form/NumberField';

describe('NumberField component', () => {
  let props: FieldProps<number>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: 25,
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<NumberField {...props} />);
    const label = container.querySelector('label');

    expect(label?.textContent).toBe('test-label');
  });

  test('propsで渡したvalueが設定される', () => {
    const { getByTestId } = render(<NumberField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;

    expect(input.value).toBe('25');
  });

  test('フォームに入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(<NumberField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '20' } });

    expect(props.onChange).toBeCalledWith(20);
  });
});
