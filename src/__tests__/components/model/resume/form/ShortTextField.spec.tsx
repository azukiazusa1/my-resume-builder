import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { FieldProps } from '@/components/model/resume/form/Form';
import ShortTextField from '@/components/model/resume/form/ShortTextField';
import { ShortTextFieldOptions } from '@/store/templateState/types';

jest.mock('@/store/filedValueState', () => ({
  fieldValueSelectors: {
    useFieldValueItem: () => 'test',
  },
}));

describe('ShortTextField component', () => {
  let props: FieldProps<string, ShortTextFieldOptions>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      templateId: 'test-template-id',
      fieldId: 'test-field-id',
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<ShortTextField {...props} />);
    const label = container.querySelector('label');

    expect(label?.textContent).toBe('test-label');
  });

  test('storeから取得したvalueが設定される', () => {
    const { getByTestId } = render(<ShortTextField {...props} />);
    const input = getByTestId('shortText') as HTMLInputElement;

    expect(input.value).toBe('test');
  });

  test('optionsを渡さなかった場合input type はtextが設定される', () => {
    const { getByTestId } = render(<ShortTextField {...props} />);
    const input = getByTestId('shortText') as HTMLInputElement;

    expect(input.type).toBe('text');
  });

  test('optionsでinput type が設定できる', () => {
    const { getByTestId } = render(<ShortTextField {...props} options={{ type: 'email' }} />);
    const input = getByTestId('shortText') as HTMLInputElement;

    expect(input.type).toBe('email');
  });

  test('フォームのフォーカスを離れた時onChangeが呼ばれる', () => {
    const { getByTestId } = render(<ShortTextField {...props} />);
    const input = getByTestId('shortText') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test2' } });
    fireEvent.blur(input);

    expect(props.onChange).toBeCalledWith('test2');
  });
});
