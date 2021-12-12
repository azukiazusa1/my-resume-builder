import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { templateActions, templateSelectors, templateState } from '../../store/templateState';

const { useTemplateItem, useTemplates } = templateSelectors;
const { useAddField } = templateActions;

describe('store/templateState/index.ts', () => {
  test('初期値ではテンプレートは2件', () => {
    const { result } = renderRecoilHook(() => useTemplates());
    expect(result.current.length).toBe(2);
  });

  test('ID で指定したテンプレートを呼び出す', () => {
    const { result } = renderRecoilHook(() => useTemplateItem('resume'));
    expect(result.current.title).toBe('履歴書');
  });

  // test('テンプレートにフィールドを追加する', () => {
  //   const { result } = renderRecoilHook(() => useTemplateItem('resume'))
  //   const prevLength = result.current.fields.length
  //   const { result: action } = renderRecoilHook(() => useAddField())
  //   const field = { label: '名前' } as any

  //   act(() => {
  //     action.current('resume', field)
  //   })

  //   const { result: next } = renderRecoilHook(() => useTemplateItem('resume'))
  //   expect(next.current.fields.length).toBe(prevLength + 1)
  // })
});
