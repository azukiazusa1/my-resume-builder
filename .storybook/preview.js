import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { SessionProvider } from 'next-auth/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import defaultTheme from '../src/lib/theme';
import { RecoilRoot } from 'recoil';

// Initialize MSW
initialize();

const withThemeProvider = (Story, context) => {
  return (
    <SessionProvider>
      <RecoilRoot>
        <Emotion10ThemeProvider theme={defaultTheme}>
          <ThemeProvider theme={defaultTheme}>
            <Story {...context} />
          </ThemeProvider>
        </Emotion10ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};

export const decorators = [withThemeProvider, mswDecorator];
