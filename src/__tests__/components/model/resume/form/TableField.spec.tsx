import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { FieldProps } from '@/components/model/resume/form/Form';
import TableField from '@/components/model/resume/form/TableField';
import type { TableFieldOptions, TableFieldValue } from '@/store/templateState/types';

let mockValue: TableFieldValue | undefined = [
  {
    id: 1,
    yearMonth: '2010/03/01',
    personalHistory: '〇〇高校卒業',
  },
  {
    id: 2,
    yearMonth: '2014/03/01',
    personalHistory: '〇〇大学卒業',
  },
  {
    id: 3,
    yearMonth: '2016/03/01',
    personalHistory: '〇〇大学院卒業',
  },
  {
    id: 4,
    yearMonth: '2016/04/01',
    personalHistory: '△△会社入社',
  },
];

jest.mock('@/store/filedValueState', () => ({
  fieldValueSelectors: {
    useFieldValueItem: jest.fn(() => mockValue),
  },
}));

describe('TableField component', () => {
  let props: FieldProps<TableFieldValue, TableFieldOptions>;

  beforeEach(() => {
    props = {
      label: 'test-label',
      fieldId: 'test-field-id',
      templateId: 'test-template-id',
      onChange: jest.fn(),
      options: {
        columns: [
          {
            field: 'yearMonth',
            headerName: '年月',
            editable: true,
            type: 'date',
            width: 200,
          },
          {
            field: 'personalHistory',
            headerName: '学歴・職歴',
            editable: true,
            width: 700,
          },
        ],
      },
    };
  });

  test('propsで渡したlabelが設定される', () => {
    const { container } = render(<TableField {...props} />);
    const label = container.querySelector('label');

    expect(label?.textContent).toBe('test-label');
  });

  test('propsで渡したvalueが設定される', () => {
    const { getAllByRole } = render(<TableField {...props} />);
    const headers = getAllByRole('columnheader');
    const rows = getAllByRole('row');

    expect(headers.length).toBe(2);
    expect(rows.length).toBe(5);
  });

  test('「行を追加」ボタンを押した時valueの配列に要素が追加されてonChangeが呼ばれる', () => {
    const { getByText } = render(<TableField {...props} />);
    const addButton = getByText('行を追加');

    fireEvent.click(addButton);
    expect(props.onChange).toHaveBeenCalledWith([
      ...mockValue!,
      {
        id: 5,
        yearMonth: null,
        personalHistory: null,
      },
    ]);
  });

  test('セルに入力した時onChangeが呼ばれる', () => {
    const { getAllByRole } = render(<TableField {...props} />);
    const cell = getAllByRole('cell');

    fireEvent.doubleClick(cell[1]);
    const input = document.activeElement as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'edit value' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(props.onChange).toHaveBeenCalledWith([
      {
        id: 1,
        yearMonth: '2010/03/01',
        personalHistory: 'edit value',
      },
      {
        id: 2,
        yearMonth: '2014/03/01',
        personalHistory: '〇〇大学卒業',
      },
      {
        id: 3,
        yearMonth: '2016/03/01',
        personalHistory: '〇〇大学院卒業',
      },
      {
        id: 4,
        yearMonth: '2016/04/01',
        personalHistory: '△△会社入社',
      },
    ]);
  });
});
