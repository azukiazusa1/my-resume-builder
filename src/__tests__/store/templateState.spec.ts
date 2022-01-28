import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';

import { templateActions, templateSelectors } from '../../store/templateState';

const { useTemplateItem, useTemplates, useTemplateFieldItem } = templateSelectors;
const { useAddField, useRemoveField, useEditTitle, useEditField } = templateActions;

describe('store/templateState/index.ts', () => {
  describe('useTemplates', () => {
    test('テンプレートの一覧を取得する', () => {
      const { result } = renderRecoilHook(() => useTemplates());
      expect(result.current.length).toBe(2);
    });
  })

  describe('useTemplateItem', () => {
    test('ID で指定したテンプレートを呼び出す', () => {
      const { result } = renderRecoilHook(() => useTemplateItem('resume'));
      expect(result.current.title).toBe('履歴書');
    });

    test('ID で指定したテンプレートがない場合例外が返却される', () => {
      const { result } = renderRecoilHook(() => useTemplateItem('hoge'));
      expect(result.error).toBeInstanceOf(Error);
    });
  })

  describe('useTemplateFieldItem', () => {
    test('テンプレートIDとフィールドIDでフィールドを呼び出す', () => {
      const { result } = renderRecoilHook(() => useTemplateFieldItem('resume', 'name'));
      expect(result?.current?.label).toBe('名前');
    });

    test('テンプレートIDがない場合例外が返却される', () => {
      const { result } = renderRecoilHook(() => useTemplateFieldItem('hoge', 'fuga'));
      expect(result.error).toBeInstanceOf(Error);
    })

    test('フィールドIDがない場合例外が返却される', () => {
      const { result } = renderRecoilHook(() => useTemplateFieldItem('resume', 'hoge'));
      expect(result.error).toBeInstanceOf(Error);
    })

    test('フィールドIDが undefined の場合 null が返される', () => {
      const { result } = renderRecoilHook(() => useTemplateFieldItem('resume', undefined));
      expect(result.current).toBeNull();
    })
  })

  describe('useAddField', () => {

    test('テンプレートにフィールドを追加する', () => {
      const { result: action } = renderRecoilHook(() => useAddField())
      const field = { label: '名前' } as any
      const { result: prev } = renderRecoilHook(() => useTemplateItem('resume'))
      const prevLength = prev.current.fields.length

      act(() => {
        action.current('resume', field)
      })

      const { result } = renderRecoilHook(() => useTemplateItem('resume'))
      expect(result.current.fields.length).toBe(prevLength + 1)
    })

    test('存在しないIDで追加しようとしたとき、例外を返す', () => {
      const { result: action } = renderRecoilHook(() => useAddField())
      const field = { label: '名前' } as any

      act(() => {
        expect(() => action.current('hoge', field)).toThrowError('not found template id: hoge')
      })
    });
  })


  describe('useEditField', () => {
    test('フィールドを編集する', () => {
      const { result: action } = renderRecoilHook(() => useEditField())
      const field = { label: 'edit 名前', fieldId: 'name' } as any
      const { result: prev } = renderRecoilHook(() => useTemplateFieldItem('resume', 'name'))
      const prevLabel = prev.current?.label

      act(() => {
        action.current('resume', field)
      })

      const { result } = renderRecoilHook(() => useTemplateFieldItem('resume', 'name'))
      expect(result?.current?.label).not.toBe(prevLabel)
    })

    test('存在しないIDで編集しようとしたとき、例外を返す', () => {
      const { result: action } = renderRecoilHook(() => useEditField())
      const field = { label: '名前' } as any

      act(() => {
        expect(() => action.current('hoge', field)).toThrowError('not found template id: hoge')
      })
    });
  })

  describe('useRemoveField', () => {

    test('テンプレートのフィールドを除外する', () => {
      const { result: action } = renderRecoilHook(() => useRemoveField())
      const { result: prev } = renderRecoilHook(() => useTemplateItem('resume'))
      const prevLength = prev.current.fields.length

      act(() => {
        action.current('resume', 'name')
      })

      const { result } = renderRecoilHook(() => useTemplateItem('resume'))
      expect(result.current.fields.length).toBe(prevLength - 1)
    })

    test('存在しないfieldIDで除外しようとしたとき、変わらない', () => {
      const { result: action } = renderRecoilHook(() => useRemoveField())
      const { result: prev } = renderRecoilHook(() => useTemplateItem('resume'))
      const prevLength = prev.current.fields.length

      act(() => {
        action.current('resume', 'hoge')
      })

      const { result } = renderRecoilHook(() => useTemplateItem('resume'))
      expect(result.current.fields.length).toBe(prevLength)
    })

    test('存在しないIDで除外しようとしたとき、例外を返す', () => {
      const { result: action } = renderRecoilHook(() => useRemoveField())

      act(() => {
        expect(() => action.current('hoge', 'name')).toThrowError('not found template id: hoge')
      })
    });
  })

  describe('useEditTitle', () => {
    test('テンプレートのタイトルを編集する', () => {
      const { result: action } = renderRecoilHook(() => useEditTitle())

      act(() => {
        action.current('resume', 'edit-title')
      })

      const { result } = renderRecoilHook(() => useTemplateItem('resume'))
      expect(result.current.title).toBe('edit-title')
    })

    test('存在しないIDでタイトルを編集しようとしたとき、例外を返す', () => {
      const { result: action } = renderRecoilHook(() => useEditTitle())

      act(() => {
        expect(() => action.current('hoge', 'title')).toThrowError('not found template id: hoge')
      })
    });
  })
})