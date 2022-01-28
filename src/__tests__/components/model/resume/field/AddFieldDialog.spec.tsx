import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import AddFieldDialog from '@/components/model/resume/field/AddFieldDialog';

const mockAddField = jest.fn();
const mockEditField = jest.fn();
let mockTemplateFieldItem: any = null;

jest.mock('@/store/templateState', () => ({
  templateActions: {
    useAddField: () => mockAddField,
    useEditField: () => mockEditField,
  },
  templateSelectors: {
    useTemplateFieldItem: () => mockTemplateFieldItem,
  },
}));

const ui = () => (
  <AddFieldDialog id="resume">
    <div data-testid="children" />
  </AddFieldDialog>
);

describe('components/model/resume/field/AddFieldDialog', () => {
  beforeEach(() => {
    mockTemplateFieldItem = null;
  });
  afterEach(() => {
    mockAddField.mockClear();
    mockEditField.mockClear();
  });

  test('childrenをクリックするとダイアログが表示される', () => {
    const { getByTestId, queryByText } = render(ui());

    const dialog = queryByText('フィールドを追加');
    expect(dialog).toBeNull();
    const children = getByTestId('children');
    fireEvent.click(children);
    const dialog2 = queryByText('フィールドを追加');
    expect(dialog2).toBeInTheDocument();
  });

  test('キャンセルボタンをクリックするとダイアログが閉じる', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);
    const cancelButton = getByText('キャンセル');
    fireEvent.click(cancelButton);
    await waitFor(() => expect(queryByText('フィールドを追加')).not.toBeInTheDocument());
  });

  test('フィールド名を入力しないで追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() =>
      expect(queryByText('フィールド名を入力してください。')).toBeInTheDocument(),
    );
  });

  test('フィールド名を21文字以上入力して追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);
    const input = getByTestId('field-name-input');
    fireEvent.change(input, { target: { value: '123456789012345678901' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('20文字以内で入力してください。')).toBeInTheDocument());
  });

  test('フィールド名を20文字以内入力して追加ボタンをクリックするとフィールドが追加される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);
    const input = getByTestId('field-name-input');
    fireEvent.change(input, { target: { value: '12345678901234567890' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('フィールドを追加')).not.toBeInTheDocument());
    expect(mockAddField).toHaveBeenCalledWith(
      'resume',
      expect.objectContaining({
        label: '12345678901234567890',
        type: 'shortText',
        block: 12,
        options: undefined,
      }),
    );
  });

  test('type：数値を入力すると単位入力が表示される', async () => {
    const { getByTestId, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('数値'));

    await waitFor(() => expect(getByText('単位')).toBeInTheDocument());
  });

  test('単位を6文字以上入力して追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('数値'));

    const input = getByTestId('field-unit-input');
    fireEvent.change(input, { target: { value: '123456' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('5文字以内で入力してください。')).toBeInTheDocument());
  });

  test('単位を5文字以内入力して追加ボタンをクリックするとフィールドが追加される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    const fieldNameInput = getByTestId('field-name-input');
    fireEvent.change(fieldNameInput, { target: { value: 'test' } });

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('数値'));

    const input = getByTestId('field-unit-input');
    fireEvent.change(input, { target: { value: '12345' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('フィールドを追加')).not.toBeInTheDocument());
    expect(mockAddField).toHaveBeenCalledWith(
      'resume',
      expect.objectContaining({
        label: 'test',
        type: 'number',
        block: 12,
        options: { unit: '12345' },
      }),
    );
  });

  test('type：画像を選択すると画像のサイズ入力が表示される', async () => {
    const { getByTestId, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('画像'));

    await waitFor(() => expect(getByText('画像のサイズを設定')).toBeInTheDocument());
    expect(getByTestId('field-width-input')).toHaveValue(120);
    expect(getByTestId('field-height-input')).toHaveValue(150);
  });

  test('画像のwidthに1未満の数値を入力して追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('画像'));

    const input = getByTestId('field-width-input');
    fireEvent.change(input, { target: { value: '-1' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('1以上の値を入力してください。')).toBeInTheDocument());
  });

  test('画像のwidthを入力しないで追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('画像'));

    const input = getByTestId('field-width-input');
    fireEvent.change(input, { target: { value: '' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('1以上の値を入力してください。')).toBeInTheDocument());
  });

  test('画像のheightに1未満の値を入力して追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('画像'));

    const input = getByTestId('field-height-input');
    fireEvent.change(input, { target: { value: '-1' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('1以上の値を入力してください。')).toBeInTheDocument());
  });

  test('画像のheightを入力しないで追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('画像'));

    const input = getByTestId('field-height-input');
    fireEvent.change(input, { target: { value: '' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('1以上の値を入力してください。')).toBeInTheDocument());
  });

  test('画像のwidthとheightを入力して追加ボタンをクリックするとフィールドが追加される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    const fieldNameInput = getByTestId('field-name-input');
    fireEvent.change(fieldNameInput, { target: { value: 'test' } });

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('画像'));

    const input = getByTestId('field-width-input');
    fireEvent.change(input, { target: { value: '100' } });
    const input2 = getByTestId('field-height-input');
    fireEvent.change(input2, { target: { value: '200' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('フィールドを追加')).not.toBeInTheDocument());
    expect(mockAddField).toHaveBeenCalledWith(
      'resume',
      expect.objectContaining({
        label: 'test',
        type: 'image',
        block: 12,
        options: { width: 100, height: 200 },
      }),
    );
  });

  test('type：テーブルを選択するとカラム設定が表示される', async () => {
    const { getByTestId, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    await waitFor(() => expect(getByText('カラム設定')).toBeInTheDocument());
    expect(getByTestId('field-headerName-input')).toBeInTheDocument();
    expect(getByTestId('field-width-input')).toHaveValue(100);
    expect(getByText('テキスト')).toBeInTheDocument();
  });

  test('「カラムを追加」ボタンをクリックするとカラム入力フォームが1つ増える', () => {
    const { getByTestId, getByText, getAllByTestId } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    const addButton = getByText('カラムを追加');
    fireEvent.click(addButton);
    expect(getAllByTestId('field-headerName-input')).toHaveLength(2);
  });

  test('カラム入力フォームが2つ以上ある場合のみ削除ボタンが各フォームに表示される', () => {
    const { getByTestId, getByText, getAllByRole, queryByRole } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    expect(queryByRole('button', { name: 'delete' })).not.toBeInTheDocument();

    const addButton = getByText('カラムを追加');
    fireEvent.click(addButton);

    expect(getAllByRole('button', { name: 'delete' })).toHaveLength(2);
  });

  test('削除ボタンをクリックすると対象のカラム入力フォームが削除される', () => {
    const { getByTestId, getAllByTestId, getByText, getAllByRole } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    const addButton = getByText('カラムを追加');
    fireEvent.click(addButton);
    fireEvent.click(getAllByRole('button', { name: 'delete' })[0]);

    expect(getAllByTestId('field-headerName-input')).toHaveLength(1);
  });

  test('カラム名を入力しないで追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    const input = getByTestId('field-headerName-input');
    fireEvent.change(input, { target: { value: '' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('カラム名を入力してください。')).toBeInTheDocument());
  });

  test('カラム名を21文字以上入力して追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    const input = getByTestId('field-headerName-input');
    fireEvent.change(input, { target: { value: '123456789012345678901' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('20文字以内で入力してください。')).toBeInTheDocument());
  });

  test('カラムのwidthを入力しないで追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    const input = getByTestId('field-width-input');
    fireEvent.change(input, { target: { value: '' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('1以上の値を入力してください。')).toBeInTheDocument());
  });

  test('カラムのwidthに1未満の値を入力して追加ボタンをクリックするとエラーメッセージが表示される', async () => {
    const { getByTestId, queryByText, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    const input = getByTestId('field-width-input');
    fireEvent.change(input, { target: { value: '0' } });
    const addButton = getByText('追加');
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText('1以上の値を入力してください。')).toBeInTheDocument());
  });

  test('カラム設定を入力して追加ボタンをクリックするとフィールドが追加される', async () => {
    const { getByTestId, getByText, getAllByTestId, queryByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    const fieldNameInput = getByTestId('field-name-input');
    fireEvent.change(fieldNameInput, { target: { value: 'test' } });

    fireEvent.mouseDown(getByText('テキスト'));
    fireEvent.click(getByText('テーブル'));

    const addButton = getByText('カラムを追加');
    fireEvent.click(addButton);

    const fieldHeaderInputs = getAllByTestId('field-headerName-input');
    fireEvent.change(fieldHeaderInputs[0], { target: { value: 'test1' } });
    fireEvent.change(fieldHeaderInputs[1], { target: { value: 'test2' } });

    const fieldWidthInputs = getAllByTestId('field-width-input');
    fireEvent.change(fieldWidthInputs[0], { target: { value: '10' } });
    fireEvent.change(fieldWidthInputs[1], { target: { value: '20' } });

    const addFieldButton = getByText('追加');
    fireEvent.click(addFieldButton);

    await waitFor(() => expect(queryByText('フィールドを追加')).not.toBeInTheDocument());
    expect(mockAddField).toHaveBeenCalledWith(
      'resume',
      expect.objectContaining({
        label: 'test',
        type: 'table',
        block: 12,
        options: {
          columns: [
            {
              field: expect.any(String),
              headerName: 'test1',
              width: 10,
              type: 'string',
              editable: true,
            },
            {
              field: expect.any(String),
              headerName: 'test2',
              width: 20,
              type: 'string',
              editable: true,
            },
          ],
        },
      }),
    );
  });

  test('useTemplateFieldItem が null 以外を返すとき編集モードとなる', async () => {
    mockTemplateFieldItem = {
      label: 'test',
      type: 'list',
    };
    const { getByTestId, getByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    await waitFor(() => expect(getByText('フィールドを編集')).toBeInTheDocument());

    const input = getByTestId('field-name-input');
    expect(input).toHaveValue('test');
  });

  test('編集モードのとき submit すると editField が呼ばれる', async () => {
    mockTemplateFieldItem = {
      label: 'test',
      type: 'list',
    };
    const { getByTestId, getByText, queryByText } = render(ui());

    const children = getByTestId('children');
    fireEvent.click(children);

    const input = getByTestId('field-name-input');
    fireEvent.change(input, { target: { value: 'test2' } });

    const addButton = getByText('編集');
    fireEvent.click(addButton);

    await waitFor(() => expect(queryByText('フィールドを編集')).not.toBeInTheDocument());

    expect(mockEditField).toHaveBeenCalledWith(
      'resume',
      expect.objectContaining({
        label: 'test2',
        type: 'list',
      }),
    );
  });
});
