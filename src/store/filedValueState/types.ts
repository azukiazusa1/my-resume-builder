export type FieldValueState = Record<string, Record<string, unknown>>

export type FieldValueActions = {
  useSetFieldValue: () => (templateId: string, fieldId: string, value: unknown) => void;
}

export type FieldValueSelectors = {
  useFieldValueItem: (templateId: string) => Record<string, unknown>;
}
