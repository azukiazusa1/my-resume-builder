export type Template = {
  id: string;
  title: string;
  fields: Field[];
}

export type Block = 1 | 2 | 3

export type Position = 'left' | 'center' | 'rigth'

type BaseField<T extends string, U extends Record<string, unknown> = {}> = {
  label: string;
  order: number;
  position: Position;
  block: Block;
  type: T;
  options: U;
}

type ShortTextField = BaseField<'shortText'>

type LongTextField = BaseField<'longText'>

type NumberField = BaseField<'number'>

type DateField = BaseField<'date'>

export type Field = ShortTextField | LongTextField | NumberField | DateField

export type TemplateState = {
  templates: Template[];
}

export type TemplateActions = {
  useAddField: () => (id: string, field: Field) => void;
  useRemoveField: () => (id: string, index: number) => void;
}

export type TemplateSelectors = {
  useTemplates: () => Template[];
  useTemplateItem: (id: string) => Template;
}


