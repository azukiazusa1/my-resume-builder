import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { FieldProps } from '@/components/model/resume/form/Form';
import NumberField from '@/components/model/resume/form/NumberField';
import { NumberFieldOptions } from '@/store/templateState/types';

jest.mock('@/store/filedValueState', () => ({
  fieldValueSelectors: {
    useFieldValueItem: () => 25,
  },
}));

describe('NumberField component', () => {
  let props: FieldProps<number, NumberFieldOptions>;

  beforeEach(() => {
    props = {
      templateId: 'test-template-id',
      fieldId: 'test-field-id',
      label: 'test-label',
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

  test('optionsでunitを渡した場合設定される', () => {
    const { getByText } = render(<NumberField {...props} options={{ unit: '人' }} />);
    expect(getByText('人')).toBeInTheDocument();
  });

  test('フォームに入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(<NumberField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '20' } });

    expect(props.onChange).toBeCalledWith(20);
  });
});
