import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { FieldProps } from '../../../../../components/model/resume/form/Form';
import ShortTextWithRubyField from '../../../../../components/model/resume/form/ShortTextWithRubyField';
import { ShortTextWithRubyValue } from '../../../../../store/templateState/types';

describe('ShortTextWithRubyField component', () => {
  let props: FieldProps<ShortTextWithRubyValue>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      value: undefined,
      onChange: jest.fn(),
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<ShortTextWithRubyField {...props} />);
    const label = container.querySelectorAll('label');

    expect(label[0]?.textContent).toBe('ふりがな');
    expect(label[1]?.textContent).toBe('test-label');
  });

  test('ふりがなにはvalue.ruby,shortTextにはvalue.valueが設定される', () => {
    const { getByTestId } = render(
      <ShortTextWithRubyField
        {...props}
        value={{
          ruby: 'test-ruby',
          value: 'test-value',
        }}
      />,
    );
    const ruby = getByTestId('ruby') as HTMLInputElement;
    const shortText = getByTestId('shortText') as HTMLInputElement;

    expect(ruby.value).toBe('test-ruby');
    expect(shortText.value).toBe('test-value');
  });

  test('ふりがなが入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(<ShortTextWithRubyField {...props} />);
    const ruby = getByTestId('ruby') as HTMLInputElement;

    fireEvent.change(ruby, { target: { value: 'ruby-test' } });

    expect(props.onChange).toBeCalledWith({ ruby: 'ruby-test', value: '' });
  });

  test('valueが設定されていてふりがなが入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(
      <ShortTextWithRubyField
        {...props}
        value={{
          ruby: 'test-ruby',
          value: 'test-value',
        }}
      />,
    );
    const ruby = getByTestId('ruby') as HTMLInputElement;

    fireEvent.change(ruby, { target: { value: 'ruby-test' } });

    expect(props.onChange).toBeCalledWith({ ruby: 'ruby-test', value: 'test-value' });
  });

  test('フォームが入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(<ShortTextWithRubyField {...props} />);
    const shortText = getByTestId('shortText') as HTMLInputElement;

    fireEvent.change(shortText, { target: { value: 'value2' } });

    expect(props.onChange).toBeCalledWith({ ruby: '', value: 'value2' });
  });

  test('valueが設定されていてふりがなが入力した時onChangeが呼ばれる', () => {
    const { getByTestId } = render(
      <ShortTextWithRubyField
        {...props}
        value={{
          ruby: 'test-ruby',
          value: 'test-value',
        }}
      />,
    );
    const shortText = getByTestId('shortText') as HTMLInputElement;

    fireEvent.change(shortText, { target: { value: 'value2' } });

    expect(props.onChange).toBeCalledWith({ ruby: 'test-ruby', value: 'value2' });
  });
});
