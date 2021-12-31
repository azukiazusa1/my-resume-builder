import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { templateActions, templateSelectors } from '../../store/templateState';

const { useTemplateItem, useTemplates } = templateSelectors;
const { useAddField, useRemoveField, useEditTitle } = templateActions;

describe('store/templateState/index.ts', () => {
  test('初期値ではテンプレートは2件', () => {
    const { result } = renderRecoilHook(() => useTemplates());
    expect(result.current.length).toBe(2);
  });

  test('ID で指定したテンプレートを呼び出す', () => {
    const { result } = renderRecoilHook(() => useTemplateItem('resume'));
    expect(result.current.title).toBe('履歴書');
  });

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