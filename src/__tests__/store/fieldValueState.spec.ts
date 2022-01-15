import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';

import { fieldValueActions, fieldValueSelectors } from '@/store/filedValueState';

const { useFieldValueItem, useTemplateValues } = fieldValueSelectors
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

  describe('useTemplateItem', () => {

    test('指定したキーがないとき 空のオブジェクト が返却される', () => {
      const { result } = renderRecoilHook(() => useTemplateValues('key'));
      expect(result.current).toEqual({});
    });

    test('localStorage に値があるときその値が初期値となる', () => {
      getItemSpy.mockReturnValueOnce('{"key": {"key": "value"}}')
      const { result } = renderRecoilHook(() => useTemplateValues('key'));
      expect(result.current).toEqual({ key: 'value' });
    })
  })

  describe('useFieldValueItem', () => {
    test('指定したテンプレートIDがないとき undefined が返される', () => {
      const { result } = renderRecoilHook(() => useFieldValueItem('key1', 'key2'));
      expect(result.current).toBeUndefined();
    })

    test('指定したテンプレートIDはあるがフィールドIDがない場合 indefined が返される', () => {
      getItemSpy.mockReturnValueOnce('{"key1": {"key2": "value"}}')
      const { result } = renderRecoilHook(() => useFieldValueItem('key1', 'key3'));
      expect(result.current).toBeUndefined();
    })

    test('指定したテンプレートIDとフィールドIDがあるときその値が返される：プリミティブ', () => {
      getItemSpy.mockReturnValueOnce('{"key1": {"key2": "value"}}')
      const { result } = renderRecoilHook(() => useFieldValueItem('key1', 'key2'));
      expect(result.current).toBe('value');
    })

    test('指定したテンプレートIDとフィールドIDがあるときその値が返される：オブジェクト', () => {
      getItemSpy.mockReturnValueOnce('{"key1": {"key2": {"key3": "value"}}}')
      const { result } = renderRecoilHook(() => useFieldValueItem('key1', 'key2'));
      expect(result.current).toEqual({ key3: 'value' });
    })
  })
  describe('useFieldValueItem', () => {

    test('テンプレートIDとフィールドIDにより値をセットし、同時にlocalStorageに永続化する', () => {
      const { result: action } = renderRecoilHook(() => useSetFieldValue())

      act(() => {
        action.current('template', 'field', 'value')
      })

      const { result } = renderRecoilHook(() => useTemplateValues('template'));
      expect(result.current).toEqual({ field: 'value' });
      expect(setItemSpy).toHaveBeenCalledWith('field_value', '{"template":{"field":"value"}}')
    })
  })
})