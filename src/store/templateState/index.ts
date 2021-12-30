import { atom, selector, selectorFamily, useSetRecoilState, useRecoilValue } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from '../RecoilKeys'
import { cloneDeep } from 'lodash-es'
import type { Template, TemplateState, TemplateSelectors, TemplateActions, Field } from './types'
import { replaceItemAtIndex } from '../../lib/utils'
import localStorageEffect from '@/store/effects/localStorageEffect'

const initialTemplates = (): TemplateState => [
  {
    id: 'resume',
    title: '履歴書',
    fields: [
      {
        fieldId: 'name',
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
  }
]


const templateState = atom<TemplateState>({
  key: RecoilAtomKeys.TEMPLATE_STATE,
  default: initialTemplates(),
  effects_UNSTABLE: [localStorageEffect('template')]
})

export const templateActions: TemplateActions = {
  useAddField: () => {

    const setState = useSetRecoilState(templateState)
    return (id: string, field: Field) => {
      setState(prev => {
        const index = prev.findIndex(v => v.id === id)
        if (index === -1) {
          throw new Error('not found template id: ' + id)
        }

        const copy = cloneDeep(prev[index])
        copy.fields = [...copy.fields, field]

        return replaceItemAtIndex(prev, index, copy)
      })
    }
  },
  useRemoveField: () => {
    const setState = useSetRecoilState(templateState)
    return (id: string, fieldId: string) => {
      setState(prev => {
        const index = prev.findIndex(v => v.id === id)
        if (index === -1) {
          throw new Error('not found template id: ' + id)
        }

        const copy = cloneDeep(prev[index])
        copy.fields = copy.fields.filter(v => v.fieldId !== fieldId)

        return replaceItemAtIndex(prev, index, copy)

      })
    }
  },
  useEditTitle: () => {
    const setState = useSetRecoilState(templateState)
    return (id: string, title: string) => {
      setState(prev => {
        const index = prev.findIndex(v => v.id === id)
        if (index === -1) {
          throw new Error('not found template id: ' + id)
        }

        const copy = cloneDeep(prev[index])
        copy.title = title

        return replaceItemAtIndex(prev, index, copy)
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
    const templates = get(templateState)
    return templates
  }
})

/**
 * 選択中のテンプレートを取得する
 */
const selectedTemplateItemSelector = selectorFamily<Template, string>({
  key: RecoilSelectorKeys.SELECTED_TEMPLATE_ITEM,
  get: (id: string) => ({ get }) => {
    const templates = get(templateState)
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