import '@testing-library/jest-dom/extend-expect';

import { fireEvent,render } from '@testing-library/react';
import React from 'react';

import Title from '@/components/model/resume/Title';

describe('components/model/resume/Title', () => {
  test('props の title が描画される', () => {
    const onChange = jest.fn();
    const { container } = render(<Title title="test-title" onChange={onChange} />);
    const title = container.querySelector('h1');

    expect(title?.textContent).toBe('test-title');
  });

  test('編集ボタンをクリックすると入力フォームに変化する', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(<Title title="test-title" onChange={onChange} />);
    const editButton = getByText('編集');

    fireEvent.click(editButton);
    const title = container.querySelector('h1');
    const input = container.querySelector('input');
    const cancelButton = getByText('キャンセル');
    const saveButton = getByText('保存');

    expect(title).toBeNull();
    expect(input?.value).toBe('test-title');
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('保存ボタンがクリックされた時 onChange が呼ばれ、通常の表示に戻る', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(<Title title="test-title" onChange={onChange} />);
    const editButton = getByText('編集');

    fireEvent.click(editButton);
    const saveButton = getByText('保存');
    const input = container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'test-title-changed' } });
    fireEvent.click(saveButton);

    expect(onChange).toBeCalledWith('test-title-changed');
    const title = container.querySelector('h1');
    expect(title?.textContent).toBe('test-title-changed');
  });

  test('input 内で Enter キーが押された時 onChange が呼ばれ、通常の表示の戻る', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(<Title title="test-title" onChange={onChange} />);
    const editButton = getByText('編集');

    fireEvent.click(editButton);
    const input = container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'test-title-changed' } });
    fireEvent.keyDown(input!, { key: 'Enter' });

    expect(onChange).toBeCalledWith('test-title-changed');
    const title = container.querySelector('h1');
    expect(title?.textContent).toBe('test-title-changed');
  });

  test('キャンセルボタンがクリックされた時 onChange は呼ばれつ、通常の表示に戻る', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(<Title title="test-title" onChange={onChange} />);
    const editButton = getByText('編集');

    fireEvent.click(editButton);
    const cancelButton = getByText('キャンセル');
    const input = container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'test-title-changed' } });
    fireEvent.click(cancelButton);

    expect(onChange).not.toBeCalled();
    const title = container.querySelector('h1');
    expect(title?.textContent).toBe('test-title');
  });
});
