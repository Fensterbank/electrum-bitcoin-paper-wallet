import { createTheme } from 'office-ui-fabric-react';

export const COLORS = {
    BLACK: '#111111',
    BLACK_BRIGHT: '#1C1C1C',
    BOSS: '#000000',
    WHITE: '#FFFFFF',
    GREY_SOFT: '#F6F6F6',
    GREY_DEEP_DARK: '#333333',
    GREY_LIGHT: '#EEEEEE',
    GREY: '#CCCCCC',
    GREY_MEDIUM: '#999999',
    GREY_DARK: '#666666',
    BLUE: '#113344',
    ORANGE: '#FF6600',
    RED: '#B51F29',
    GREEN: '#80BA27',
};

const theme = createTheme({
    palette: {
        themePrimary: COLORS.BLUE,
        themeSecondary: COLORS.BLUE,
        themeDark: COLORS.BLUE,
        themeDarkAlt: COLORS.BLACK,
        themeDarker: COLORS.BLACK,
        themeLight: COLORS.GREY,
        themeLighter: COLORS.GREY_LIGHT,
        neutralPrimary: COLORS.BLACK,
        neutralSecondary: COLORS.BLUE,
    },
});

export default { theme };
