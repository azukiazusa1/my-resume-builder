import { GridColumns, GridRowsProp } from '@mui/x-data-grid';

export type Template = {
  id: string;
  title: string;
  fields: Field[];
}

export type Block = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type BaseField<T extends string, U extends Record<string, unknown> | undefined = undefined> = {
  fieldId: string;
  label: string;
  order: number;
  block: Block;
  type: T;
  options?: U;
}

export type ShortTextFieldOptions = { type: 'text' | 'number' | 'email' | 'tel' | 'password' | 'url' }

type ShortTextField = BaseField<'shortText', ShortTextFieldOptions>

type ShortTextWithRubyField = BaseField<'shortTextWithRuby'>

export type ShortTextWithRubyValue = { ruby: string, value: string }

type LongTextField = BaseField<'longText'>

type ImageField = BaseField<'image'>

export type NumberFieldOptions = { unit: string }

type NumberField = BaseField<'number', NumberFieldOptions>

type CheckboxField = BaseField<'checkbox'>

type AddressField = BaseField<'address'>

export type AddressFieldValue = {
  postCodeFirst?: string;
  postCodeLast?: string;
  ruby?: string;
  prefecture?: string;
  address?: string;
}

type DateField = BaseField<'date'>

type ListField = BaseField<'list'>

export type TableFieldOptions = { columns: GridColumns }

type TableField = BaseField<'table', TableFieldOptions>

export type TableFieldValue = GridRowsProp

export type Field = ShortTextField | ShortTextWithRubyField | LongTextField | ImageField | NumberField | CheckboxField | AddressField | DateField | ListField | TableField

export const fieldTypes = [
  { type: 'shortText', label: 'テキスト' },
  { type: 'shortTextWithRuby', label: 'ふりがな付きテキスト' },
  { type: 'longText', label: 'テキスト（複数行）' },
  { type: 'image', label: '画像' },
  { type: 'number', label: '数値' },
  { type: 'checkbox', label: 'チェックボックス' },
  { type: 'address', label: '住所' },
  { type: 'date', label: '日付' },
  { type: 'list', label: 'リスト' },
  { type: 'table', label: 'テーブル' },
] as const

export type FieldWithValue = Field & {
  value?: Field['type'] extends 'shortText' | 'longText' | 'image' | 'date' ? string
  : Field['type'] extends 'number' ? number
  : Field['type'] extends 'checkbox' ? boolean
  : Field['type'] extends 'list' ? string[]
  : Field['type'] extends 'shortTextWithRuby' ? ShortTextWithRubyValue
  : Field['type'] extends 'address' ? AddressFieldValue
  : Field['type'] extends 'table' ? TableFieldValue
  : any
}

export type TemplateState = Template[];

export type TemplateActions = {
  useAddField: () => (id: string, field: Field) => void;
  useRemoveField: () => (id: string, fieldId: string) => void;
  useEditTitle: () => (id: string, title: string) => void;
}

export type TemplateSelectors = {
  useTemplates: () => Template[];
  useTemplateItem: (id: string) => Template;
}


