export type FieldValueState = Record<string, Record<string, unknown>>

export type FieldValueActions = {
  /** テンプレートIDとフィールドIDで指定したフィールドの値を更新する */
  useSetFieldValue: () => (templateId: string, fieldId: string, value: unknown) => void;
}

export type FieldValueSelectors = {
  /** テンプレートIDとフィールドIDから特定のフィールドの値を取得する */
  useFieldValueItem: <T = any>(templateId: string, fieldId: string) => T | undefined;
  /** テンプレートIDから特定のテンプレートのフィールドの値の一覧を取得する */
  useTemplateValues: (templateId: string) => Record<string, unknown>;
  /** テンプレートIDから最終更新日時を取得する */
  useTemplateLastUpdate: (templateId: string) => string | undefined;
}
