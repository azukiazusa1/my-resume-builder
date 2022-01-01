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


