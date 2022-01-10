import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import debounceRender from 'react-debounce-render';

import Document from '@/components/model/resume/pdf/Document';
import { fieldValueSelectors } from '@/store/filedValueState';
import { templateSelectors } from '@/store/templateState';

const DebounceDocument = debounceRender(Document, 1500);
const { useTemplateItem } = templateSelectors;
const { useFieldValueItem } = fieldValueSelectors;

type Props = {
  id: string;
};
const Edit: React.VFC<Props> = ({ id }) => {
  const template = useTemplateItem(id);
  const fieldValue = useFieldValueItem(id);

  const filedWithValues = template.fields.map((field) => {
    return {
      ...field,
      value: fieldValue[field.fieldId],
    };
  });

  return (
    <PDFViewer style={{ width: '100%' }} showToolbar={false}>
      <DebounceDocument fieldWithValues={filedWithValues} />
    </PDFViewer>
  );
};

export default Edit;
