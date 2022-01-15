import { fieldValueSelectors } from '@/store/filedValueState';
import { templateSelectors } from '@/store/templateState';

const { useTemplateItem } = templateSelectors;
const { useTemplateValues } = fieldValueSelectors;

const usePDFValue = (id: string) => {
  const template = useTemplateItem(id);
  const fieldValue = useTemplateValues(id);

  const filedWithValues = template.fields.map((field) => {
    return {
      ...field,
      value: fieldValue?.[field.fieldId],
    };
  });

  return filedWithValues;
}

export default usePDFValue