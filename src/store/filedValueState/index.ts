import { cloneDeep } from 'lodash-es'
import { atom, selectorFamily, useRecoilValue,useSetRecoilState } from 'recoil'

import localStorageEffect from '@/store/effects/localStorageEffect'

import { RecoilAtomKeys, RecoilSelectorKeys } from '../RecoilKeys'
import type { FieldValueActions,FieldValueSelectors, FieldValueState } from './types'


const fieldValueState = atom<FieldValueState>({
  key: RecoilAtomKeys.FIELD_VALUE_STATE,
  default: {},
  effects_UNSTABLE: [localStorageEffect('field_value')]
})

/**
 * テンプレートIDとフィールドのIDを指定して、フィールドの値を取得する
 */
const fieldValueSelector = selectorFamily<Record<string, unknown>, string>({
  key: RecoilSelectorKeys.FIELD_VALUE_ITEM,
  get: (templateId) => ({ get }) => {
    const fieldValue = get(fieldValueState)
    return fieldValue[templateId] ?? {}
  }
})

export const fieldValueSelectors: FieldValueSelectors = {
  useFieldValueItem: (templateId) => useRecoilValue(fieldValueSelector(templateId))
}

export const fieldValueActions: FieldValueActions = {
  useSetFieldValue: () => {

    const setState = useSetRecoilState(fieldValueState)
    return (templateId: string, fieldId: string, value: unknown) => {
      setState(prev => {
        const copy = cloneDeep(prev)
        copy[templateId] = { ...copy[templateId], [fieldId]: value }
        return copy
      })
    }
  },
}