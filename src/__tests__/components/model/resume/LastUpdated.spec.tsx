import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import LastUpdated from '@/components/model/resume/LastUpdated';

describe('components/model/resume/LastUpdated', () => {
  test('props の datetime がYYYY年MM月DD日 HH:mm形式で描画される', () => {
    const { container } = render(<LastUpdated datetime="2001-05-15T19:00" />);
    const time = container.querySelector('time');

    expect(time?.textContent).toBe('2001年05月15日 19:00');
  });

  test('props を省略した場合描画されない', () => {
    const { container } = render(<LastUpdated />);
    const time = container.querySelector('time');

    expect(time).toBeNull();
  });
});
