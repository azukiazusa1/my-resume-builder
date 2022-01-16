import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import CheckboxField from '@/components/model/resume/form/CheckboxField';
import { FieldProps } from '@/components/model/resume/form/Form';

let mockValue: boolean | undefined = undefined;

jest.mock('@/store/filedValueState', () => ({
  fieldValueSelectors: {
    useFieldValueItem: jest.fn(() => mockValue),
  },
}));

describe('components/model/resume/form/CheckboxField', () => {
  let props: FieldProps<boolean>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      templateId: 'test-template-id',
      fieldId: 'test-field-id',
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { getByText } = render(<CheckboxField {...props} />);
    expect(getByText('test-label')).toBeInTheDocument();
  });

  test('storeのvalueが設定される', () => {
    mockValue = true;
    const { container } = render(<CheckboxField {...props} />);
    const input = container.querySelector('input');
    expect(input?.value).toBe('on');
  });

  test('フォームに入力した時onChangeが呼ばれる - 初期値がtrue', () => {
    mockValue = true;
    const { container } = render(<CheckboxField {...props} />);
    const input = container.querySelector('input');

    fireEvent.click(input!);
    expect(props.onChange).toBeCalledWith(false);
  });

  test('フォームに入力した時onChangeが呼ばれる - 初期値がfalse', () => {
    mockValue = false;
    const { container } = render(<CheckboxField {...props} />);
    const input = container.querySelector('input');

    fireEvent.click(input!);

    expect(props.onChange).toBeCalledWith(true);
  });
});
