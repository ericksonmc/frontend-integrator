import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    backgroundColor: '#070f25',
    secondaryBackgroundColor: '#581305',
    primaryFontColor: '#fff',
    secondaryFontColor: '#555',
    buttonFontColor: '#9f1307',
};

export function ProvideTheme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
