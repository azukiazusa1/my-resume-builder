import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';

import { fieldValueActions, fieldValueSelectors } from '@/store/filedValueState';

const { useFieldValueItem, useTemplateValues, useTemplateLastUpdate } = fieldValueSelectors
const { useSetFieldValue } = fieldValueActions
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem')
import MockDate from 'mockdate'

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

  describe('useTemplateLastUpdate', () => {
    test('指定したテンプレートIDで最終更新日時を取得する', () => {
      getItemSpy.mockReturnValueOnce('{"key1": {"lastUpdate": "2022-01-23T06:19:03.497Z"}}')
      const { result } = renderRecoilHook(() => useTemplateLastUpdate('key1'));
      expect(result.current).toBe("2022-01-23T06:19:03.497Z");
    })
    test('指定したテンプレートIDが存在しない場合 undefined を返す', () => {
      const { result } = renderRecoilHook(() => useTemplateLastUpdate('key1'));
      expect(result.current).toBeUndefined();
    })
    test('指定したテンプレートIDに lastUpdate プロパティが存在しないとき undefined を返す', () => {
      getItemSpy.mockReturnValueOnce('{"key1": {"key2": {"key3": "value"}}}')
      const { result } = renderRecoilHook(() => useTemplateLastUpdate('key1'));
      expect(result.current).toBeUndefined();
    })
  })

  describe('useSetFieldValue', () => {

    test('テンプレートIDとフィールドIDにより値をセットし最終更新日時を更新して同時にlocalStorageに永続化する', () => {
      const { result: action } = renderRecoilHook(() => useSetFieldValue())
      const date = "2022-01-23T06:19:03.497Z"
      MockDate.set(date)

      act(() => {
        action.current('template', 'field', 'value')
      })

      const { result } = renderRecoilHook(() => useTemplateValues('template'));
      expect(result.current).toEqual({ field: 'value', lastUpdate: date });
      expect(setItemSpy).toHaveBeenCalledWith('field_value', '{"template":{"field":"value","lastUpdate":"2022-01-23T06:19:03.497Z"}}')
      MockDate.reset();
    })
  })
})