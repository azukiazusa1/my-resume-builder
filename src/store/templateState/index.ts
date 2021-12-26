import { atom, selector, selectorFamily, useSetRecoilState, useRecoilValue } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from '../RecoilKeys'
import { cloneDeep } from 'lodash-es'
import type { Template, TemplateState, TemplateSelectors, TemplateActions, Field } from './types'
import { removeItemAtIndex, replaceItemAtIndex } from '../../lib/utils'

const initialTemplates = (): TemplateState => ({
  templates: [
    {
      id: 'resume',
      title: '履歴書',
      fields: [
        {
          label: '名前',
          order: 1,
          position: 'left',
          block: 3,
          type: 'shortText',
          options: {}
        }
      ]
    },
    {
      id: 'curriculumVitae',
      title: '職務経歴書',
      fields: []
    }]
})

const templateState = atom<TemplateState>({
  key: RecoilAtomKeys.TEMPLATE_STATE,
  default: initialTemplates()
})

export const templateActions: TemplateActions = {
  useAddField: () => {

    const setState = useSetRecoilState(templateState)
    return (id: string, field: Field) => {
      setState(prev => {
        const index = prev.templates.findIndex(v => v.id === id)
        if (index === -1) {
          throw new Error('not found template id:' + id)
        }

        const copy = cloneDeep(prev.templates[index])
        copy.fields = [...copy.fields, field]

        return {
          ...prev,
          templates: replaceItemAtIndex(prev.templates, index, copy)
        }
      })
    }
  },
  useRemoveField: () => {
    const setState = useSetRecoilState(templateState)
    return (id: string, index: number) => {
      setState(prev => {
        const template = prev.templates.find(v => v.id === id)
        if (!template) {
          throw new Error('not found template id:' + id)
        }

        const copy = cloneDeep(template)
        copy.fields = removeItemAtIndex(copy.fields, index)

        return {
          ...prev,
          templates: replaceItemAtIndex(prev.templates, index, copy)
        }
      })
    }
  }
}

/**
 * すべてのテンプレートを取得する
 */
const templateListSelector = selector<Template[]>({
  key: RecoilSelectorKeys.TEMPLATE_LIST,
  get: ({ get }) => {
    const templates = get(templateState).templates
    return templates
  }
})

/**
 * 選択中のテンプレートを取得する
 */
export const selectedTemplateItemSelector = selectorFamily<Template, string>({
  key: RecoilSelectorKeys.SELECTED_TEMPLATE_ITEM,
  get: (id: string) => ({ get }) => {
    const templates = get(templateListSelector)
    const selectedTemplate = templates.find(template => template.id === id)

    if (!selectedTemplate) {
      throw new Error('selectedTemplate is not found')
    }
    return selectedTemplate
  }
})

export const templateSelectors: TemplateSelectors = {
  useTemplates: () => useRecoilValue(templateListSelector),
  useTemplateItem: (id: string) => useRecoilValue(selectedTemplateItemSelector(id))
}