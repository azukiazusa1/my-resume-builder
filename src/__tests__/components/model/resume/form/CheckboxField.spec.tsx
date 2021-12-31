import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import CheckboxField from '@/components/model/resume/form/CheckboxField';
import { FieldProps } from '@/components/model/resume/form/Form';

describe('components/model/resume/form/CheckboxField', () => {
  let props: FieldProps<boolean>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: false,
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { getByText } = render(<CheckboxField {...props} />);
    expect(getByText('test-label')).toBeInTheDocument();
  });

  test('propsで渡したvalueが設定される', () => {
    const { container } = render(<CheckboxField {...props} value={true} />);
    const input = container.querySelector('input');
    expect(input!).toBeChecked();
  });

  test('フォームに入力した時onChangeが呼ばれる - 初期値がtrue', () => {
    const { container } = render(<CheckboxField {...props} value={true} />);
    const input = container.querySelector('input');

    fireEvent.click(input!);
    expect(props.onChange).toBeCalledWith(false);
  });

  test('フォームに入力した時onChangeが呼ばれる - 初期値がfalse', () => {
    const { container } = render(<CheckboxField {...props} value={false} />);
    const input = container.querySelector('input');

    fireEvent.click(input!);

    expect(props.onChange).toBeCalledWith(true);
  });
});
