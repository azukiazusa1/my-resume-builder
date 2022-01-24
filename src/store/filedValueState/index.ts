import { cloneDeep } from 'lodash-es'
import { atom, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil'

import localStorageEffect from '@/store/effects/localStorageEffect'

import { RecoilAtomKeys, RecoilSelectorKeys } from '../RecoilKeys'
import type { FieldValueActions, FieldValueSelectors, FieldValueState } from './types'


const fieldValueState = atom<FieldValueState>({
  key: RecoilAtomKeys.FIELD_VALUE_STATE,
  default: {},
  effects_UNSTABLE: [localStorageEffect('field_value')]
})

/**
 * テンプレートIDとフィールドのIDを指定して、フィールドの値を取得する
 */
const fieldValueSelector = selectorFamily<string | undefined, { templateId: string, fieldId: string }>({
  key: RecoilSelectorKeys.FIELD_VALUE_ITEM,
  get: ({ templateId, fieldId }) => ({ get }) => {
    const fieldValue = get(fieldValueState)
    const templateField = fieldValue[templateId]
    if (!templateField) {
      return undefined
    }
    const v = templateField[fieldId]
    // selector の値の同一性は値の比較(===)で判定するため
    // selector が再計算されないように、JSON.stringifyして返す
    return typeof v == 'undefined' ? v : JSON.stringify(v)
  }
})

/**
 * テンプレートIDを指定して、テンプレートのフィールドの値一覧を取得する
 */
const templateValueSelector = selectorFamily<Record<string, unknown>, { templateId: string }>({
  key: RecoilSelectorKeys.FIELD_VALUE_ITEM_LIST,
  get: ({ templateId }) => ({ get }) => {
    const fieldValue = get(fieldValueState)
    return fieldValue[templateId]
  }
})

/**
 * テンプレートIDを指定して最終更新日時を取得する
 */
const templateLastUpdateSelector = selectorFamily<string | undefined, { templateId: string }>({
  key: RecoilSelectorKeys.FIELDVALUE_LAST_UPDATE,
  get: ({ templateId }) => ({ get }) => {
    const fieldValue = get(fieldValueState)
    const templateField = fieldValue[templateId]
    if (!templateField) {
      return undefined
    }
    return templateField.lastUpdate as string
  }
})


export const fieldValueSelectors: FieldValueSelectors = {
  useFieldValueItem: <T = any>(templateId: string, fieldId: string): T | undefined => {
    const recoilValue = useRecoilValue(fieldValueSelector({ templateId, fieldId }))
    if (recoilValue === undefined) {
      return undefined
    }
    try {
      return JSON.parse(recoilValue) as T
    } catch (e) {
      return undefined
    }
  },
  useTemplateValues: (templateId: string): Record<string, unknown> => {
    const recoilValue = useRecoilValue(templateValueSelector({ templateId }))
    if (recoilValue === undefined) {
      return {}
    }
    return recoilValue
  },
  useTemplateLastUpdate: (templateId: string): string | undefined => {
    const recoilValue = useRecoilValue(templateLastUpdateSelector({ templateId }))
    return recoilValue
  }
}

export const fieldValueActions: FieldValueActions = {
  useSetFieldValue: () =>

    useRecoilCallback(({ set }) => (templateId: string, fieldId: string, value: unknown) => {
      set(fieldValueState, prev => {
        const copy = cloneDeep(prev)
        copy[templateId] = { ...copy[templateId], [fieldId]: value }
        copy[templateId].lastUpdate = new Date().toISOString()
        return copy
      })
    })
}