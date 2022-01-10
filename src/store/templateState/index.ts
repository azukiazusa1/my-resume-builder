import { cloneDeep } from 'lodash-es'
import { atom, selector, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil'

import localStorageEffect from '@/store/effects/localStorageEffect'

import { replaceItemAtIndex } from '../../lib/utils'
import { RecoilAtomKeys, RecoilSelectorKeys } from '../RecoilKeys'
import type { Field, Template, TemplateActions, TemplateSelectors, TemplateState } from './types'

const initialTemplates = (): TemplateState => [
  {
    id: 'resume',
    title: '履歴書',
    fields: [
      {
        fieldId: 'name',
        label: '名前',
        order: 1,
        block: 8,
        type: 'shortTextWithRuby',
      },
      {
        fieldId: 'photo',
        label: '写真',
        order: 2,
        block: 4,
        type: 'image'
      },
      {
        fieldId: 'birthday',
        label: '生年月日',
        order: 3,
        block: 10,
        type: 'date'
      },
      {
        fieldId: 'age',
        label: '年齢',
        order: 4,
        block: 2,
        type: 'number',
        options: {
          unit: '歳'
        }
      },
      {
        fieldId: 'address',
        label: '現住所',
        order: 5,
        block: 12,
        type: 'address'
      },
      {
        fieldId: 'tel',
        label: '電話番号',
        order: 6,
        block: 6,
        type: 'shortText',
        options: {
          type: 'tel'
        }
      },
      {
        fieldId: 'email',
        label: 'email',
        order: 7,
        block: 6,
        type: 'shortText',
        options: {
          type: 'email'
        }
      },
      {
        fieldId: 'career',
        label: '学歴・職歴',
        order: 8,
        block: 12,
        type: 'table',
        options: {
          columns: [
            {
              field: 'yearMonth',
              headerName: '年月',
              editable: true,
              type: 'date',
              width: 150,
            },
            {
              field: 'personalHistory',
              headerName: '学歴・職歴',
              editable: true,
              width: 700,
            },
          ],
        },
      },
      {
        fieldId: 'certification',
        label: '資格・免許',
        order: 9,
        block: 12,
        type: 'table',
        options: {
          columns: [
            {
              field: 'yearMonth',
              headerName: '年月',
              editable: true,
              type: 'date',
              width: 150,
            },
            {
              field: 'certification',
              headerName: '資格・免許',
              editable: true,
              width: 700,
            },
          ],
        },
      },
      {
        fieldId: 'reasonsForApplication',
        label: '志望動機,自己PR,趣味,特技など',
        order: 10,
        block: 12,
        type: 'longText'
      },
      {
        fieldId: 'commute',
        label: '通勤時間',
        order: 11,
        block: 3,
        type: 'shortText'
      },
      {
        fieldId: 'dependents',
        label: '扶養家族（配偶者を除く）',
        order: 12,
        block: 3,
        type: 'number',
        options: {
          unit: '人'
        }
      },
      {
        fieldId: 'spouse',
        label: '配偶者',
        order: 13,
        block: 3,
        type: 'checkbox'
      },
      {
        fieldId: 'obligationToSupportSpouse',
        label: '配偶者の扶養義務',
        order: 14,
        block: 3,
        type: 'checkbox'
      },
      {
        fieldId: 'other',
        label: '本人希望記入欄（特に待遇・職種・勤務時間・その他についての希望などがあれば記入）',
        order: 15,
        block: 12,
        type: 'longText'
      },
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
  useAddField: () =>
    useRecoilCallback(({ set }) => (id: string, field: Field) => {
      set(templateState, prev => {
        const index = prev.findIndex(v => v.id === id)
        if (index === -1) {
          throw new Error('not found template id: ' + id)
        }

        const copy = cloneDeep(prev[index])
        copy.fields = [...copy.fields, field]

        return replaceItemAtIndex(prev, index, copy)
      })
    }),
  useRemoveField: () =>
    useRecoilCallback(({ set }) => (id: string, fieldId: string) => {
      set(templateState, prev => {
        const index = prev.findIndex(v => v.id === id)
        if (index === -1) {
          throw new Error('not found template id: ' + id)
        }

        const copy = cloneDeep(prev[index])
        copy.fields = copy.fields.filter(v => v.fieldId !== fieldId)

        return replaceItemAtIndex(prev, index, copy)
      })
    }),
  useEditTitle: () =>
    useRecoilCallback(({ set }) => (id: string, title: string) => {
      set(templateState, prev => {
        const index = prev.findIndex(v => v.id === id)
        if (index === -1) {
          throw new Error('not found template id: ' + id)
        }

        const copy = cloneDeep(prev[index])
        copy.title = title

        return replaceItemAtIndex(prev, index, copy)
      })
    }),
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