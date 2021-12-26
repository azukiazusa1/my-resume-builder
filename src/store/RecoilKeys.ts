/**
 * Recoil では atom と selector を区別する key をアプリケーション全体で
 * 一意に定義する必要があるので enum を作成して key を管理する。
 */

export enum RecoilAtomKeys {
  TEMPLATE_STATE = 'templateState',
  SELECTED_ID_TEMPLATE = 'selectedIdTemplate'
}

export enum RecoilSelectorKeys {
  TEMPLATE_LIST = 'templateList',
  SELECTED_TEMPLATE_ITEM = 'selectedTemplateItem'
}
