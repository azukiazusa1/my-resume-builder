import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import DeleteConfirmDialog from '@/components/ui/DeleteConfirmDialog';

describe('components/ui/DeleteComfirmDialog', () => {
  let props: any;

  const handleClose = jest.fn();
  const handleCancel = jest.fn();
  const handleConfirm = jest.fn();

  beforeEach(() => {
    props = {
      open: true,
      title: 'フィールドを削除しますか？',
      description: '削除すると元に戻せません。本当によろしいですか？',
      handleClose,
      handleCancel,
      handleConfirm,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('open が false のとき描画されない', () => {
    props.open = false;
    const { queryByRole } = render(<DeleteConfirmDialog {...props} />);
    const dialog = queryByRole('dialog');

    expect(dialog).toBeNull();
  });

  test('open が true のとき描画される', () => {
    const { getByRole } = render(<DeleteConfirmDialog {...props} />);
    const dialog = getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('タイトルに title の値が設定される', () => {
    const { getByRole } = render(<DeleteConfirmDialog {...props} />);
    const title = getByRole('heading');
    expect(title).toHaveTextContent(props.title);
  });

  test('コンテンツに description の値が設定される', () => {
    const { getByTestId } = render(<DeleteConfirmDialog {...props} />);
    const description = getByTestId('dialog-description');
    expect(description).toHaveTextContent(props.description);
  });

  test('キャンセルボタンのデフォルトは「キャンセル」が表示される', () => {
    const { getByTestId } = render(<DeleteConfirmDialog {...props} />);
    const cancelButton = getByTestId('cancel-button');
    expect(cancelButton).toHaveTextContent('キャンセル');
  });

  test('キャンセルボタンのテキストが設定された場合はその値が表示される', () => {
    props.cancelButtonText = 'キャンセル';
    const { getByTestId } = render(<DeleteConfirmDialog {...props} />);
    const cancelButton = getByTestId('cancel-button');
    expect(cancelButton).toHaveTextContent(props.cancelButtonText);
  });

  test('OKボタンのデフォルトは「OK」が表示される', () => {
    const { getByTestId } = render(<DeleteConfirmDialog {...props} />);
    const confirmButton = getByTestId('confirm-button');
    expect(confirmButton).toHaveTextContent('OK');
  });

  test('OKボタンのテキストが設定された場合はその値が表示される', () => {
    props.confirmButtonText = 'OK';
    const { getByTestId } = render(<DeleteConfirmDialog {...props} />);
    const confirmButton = getByTestId('confirm-button');
    expect(confirmButton).toHaveTextContent(props.confirmButtonText);
  });

  test('キャンセルボタンをクリックしたとき handleCancel が呼ばれる', async () => {
    const { getByTestId } = render(<DeleteConfirmDialog {...props} />);
    const cancelButton = getByTestId('cancel-button');
    await fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalled();
  });

  test('OKボタンをクリックしたとき handleConfirm が呼ばれる', async () => {
    const { getByTestId } = render(<DeleteConfirmDialog {...props} />);
    const confirmButton = getByTestId('confirm-button');
    await fireEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalled();
  });
});
