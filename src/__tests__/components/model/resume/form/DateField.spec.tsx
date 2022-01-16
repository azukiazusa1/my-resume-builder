import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import DateField from '@/components/model/resume/form/DateField';
import { FieldProps } from '@/components/model/resume/form/Form';

jest.mock('@/store/filedValueState', () => ({
  fieldValueSelectors: {
    useFieldValueItem: () => '2021-12-24',
  },
}));

describe('DateField component', () => {
  let props: FieldProps<string>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      templateId: 'test-template-id',
      fieldId: 'test-field-id',
      onChange: jest.fn(),
    };
  });

  beforeAll(() => {
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: any) => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
        matches: query === '(pointer: fine)',
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  afterAll(() => {
    delete (window as any).matchMedia;
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<DateField {...props} />);
    const label = container.querySelector('label');

    expect(label?.textContent).toBe('test-label');
  });

  test('propsで渡したvalueYYYY/MMM/DD形式が設定される', () => {
    const { getByTestId } = render(<DateField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;

    expect(input.value).toBe('2021/12/24');
  });

  test('フォームに入力した時YYYY-MM-DD形式でonChangeが呼ばれる', () => {
    const { getByTestId } = render(<DateField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '2022/01/01' } });

    expect(props.onChange).toBeCalledWith('2022-01-01');
  });

  test('フォームの入力をクリアした時空文字ででonChangeが呼ばれる', () => {
    const { getByTestId } = render(<DateField {...props} />);
    const input = getByTestId('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '' } });

    expect(props.onChange).toBeCalledWith('');
  });
});
