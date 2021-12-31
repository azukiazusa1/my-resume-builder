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
        block: 10,
        type: 'shortTextWithRuby',
      },
      {
        fieldId: 'photo',
        label: '写真',
        order: 2,
        block: 2,
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
        label: '住所',
        order: 5,
        block: 12,
        type: 'shortTextWithRuby'
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
              width: 200,
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
        type: 'number'
      },
      {
        fieldId: 'obligationToSupportSpouse',
        label: '配偶者の扶養義務',
        order: 14,
        block: 3,
        type: 'number'
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