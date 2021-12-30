import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { fieldValueSelectors, fieldValueActions } from '@/store/filedValueState';

const { useFieldValueItem } = fieldValueSelectors
const { useSetFieldValue } = fieldValueActions
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem')

describe('store/templateState/index.ts', () => {

  beforeEach(() => {
    setItemSpy.mockClear()
    removeItemSpy.mockClear()
    getItemSpy.mockClear()
  })

  test('指定したキーがないとき 空のオブジェクト が返却される', () => {
    const { result } = renderRecoilHook(() => useFieldValueItem('key'));
    expect(result.current).toEqual({});
  });

  test('localStorage に値があるときその値が初期値となる', () => {
    getItemSpy.mockReturnValueOnce('{"key": {"key": "value"}}')
    const { result } = renderRecoilHook(() => useFieldValueItem('key'));
    expect(result.current).toEqual({ key: 'value' });
  })

  test('テンプレートIDとフィールドIDにより値をセットし、同時にlocalStorageに永続化する', () => {
    const { result: action } = renderRecoilHook(() => useSetFieldValue())

    act(() => {
      action.current('template', 'field', 'value')
    })

    const { result } = renderRecoilHook(() => useFieldValueItem('template'));
    expect(result.current).toEqual({ field: 'value' });
    expect(setItemSpy).toHaveBeenCalledWith('field_value', '{"template":{"field":"value"}}')
  })
})
