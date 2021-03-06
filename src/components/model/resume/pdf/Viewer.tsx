import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';

import Document from '@/components/model/resume/pdf/Document';
import { fieldValueSelectors } from '@/store/filedValueState';
import { templateSelectors } from '@/store/templateState';

const { useTemplateItem } = templateSelectors;
const { useTemplateValues } = fieldValueSelectors;

type Props = {
  id: string;
};
const Edit: React.VFC<Props> = ({ id }) => {
  const template = useTemplateItem(id);
  const fieldValue = useTemplateValues(id);

  const filedWithValues = template.fields.map((field) => {
    return {
      ...field,
      value: fieldValue[field.fieldId],
    };
  });

  return (
    <PDFViewer style={{ width: '100%' }} showToolbar={false}>
      <Document fieldWithValues={filedWithValues} />
    </PDFViewer>
  );
};

export default Edit;
