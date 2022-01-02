import '@testing-library/jest-dom/extend-expect';

import useMediaQuery from '@mui/material/useMediaQuery';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

import Edit from '@/components/model/resume/Edit';

jest.mock('next/router', () => ({
  useRouter: () => {
    return {
      query: {
        id: 'resume',
      },
    };
  },
}));

jest.mock('@react-pdf/renderer', () => ({
  PDFViewer: () => <div>PDFViewer</div>,
}));
jest.mock('@/components/model/resume/pdf/Document', () => <div>Document</div>);

jest.mock('@mui/material/useMediaQuery');
const mockUseMediaQuery = useMediaQuery as jest.Mock;

describe('components/model/resume/Edit', () => {
  test('テンプレートの持つフィールドが全て表示される', () => {
    const { getAllByTestId } = render(
      <RecoilRoot>
        <Edit />
      </RecoilRoot>,
    );

    const fields = getAllByTestId('field');

    expect(fields.length).toBe(15);
  });

  test('初期表示ではPDFビューワーは表示されない', () => {
    const { queryByTestId } = render(
      <RecoilRoot>
        <Edit />
      </RecoilRoot>,
    );

    const pdfViewer = queryByTestId('pdf-viewer');

    expect(pdfViewer).toBeNull();
  });

  test('プレビューボタンをクリックするとPDFビューワーが表示される', () => {
    const { getByTestId } = render(
      <RecoilRoot>
        <Edit />
      </RecoilRoot>,
    );

    const previewButton = getByTestId('toggle-preview');

    fireEvent.click(previewButton);

    const pdfViewer = getByTestId('pdf-viewer');

    expect(pdfViewer).toBeInTheDocument();
  });

  test('PDFビューワを表示中にプレビューボタンをクリックするとPDFビューワを閉じる', () => {
    const { getByTestId } = render(
      <RecoilRoot>
        <Edit />
      </RecoilRoot>,
    );

    const previewButton = getByTestId('toggle-preview');

    fireEvent.click(previewButton);

    const pdfViewer = getByTestId('pdf-viewer');

    fireEvent.click(previewButton);

    expect(pdfViewer).not.toBeInTheDocument();
  });

  test('画面サイズがmd以上の場合場合プレビューボタンをクリックしてもフォームは表示され続ける', () => {
    mockUseMediaQuery.mockImplementation(() => false);

    const { getByTestId } = render(
      <RecoilRoot>
        <Edit />
      </RecoilRoot>,
    );

    const previewButton = getByTestId('toggle-preview');
    const resumeForm = getByTestId('resume-form');

    expect(resumeForm).toBeInTheDocument();

    fireEvent.click(previewButton);

    expect(resumeForm).toBeInTheDocument();
  });

  test('画面サイズがsm以下の場合プレビューボタンをクリックするとフォームが非表示になる', () => {
    mockUseMediaQuery.mockImplementation(() => true);

    const { queryByTestId, getByTestId } = render(
      <RecoilRoot>
        <Edit />
      </RecoilRoot>,
    );

    const previewButton = getByTestId('toggle-preview');
    const resumeForm = queryByTestId('resume-form');

    expect(resumeForm).toBeInTheDocument();

    fireEvent.click(previewButton);

    expect(resumeForm).not.toBeInTheDocument();
  });
});
