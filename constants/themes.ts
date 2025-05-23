import { MD3LightTheme as DefaultLightTheme, MD3DarkTheme as DefaultDarkTheme } from 'react-native-paper';

export const lightTheme = {
    ...DefaultLightTheme,
    backgroundGradientColor: ['#eef9f9', '#a6b2cd'],
    calendarDateIndicatorColor: '#E6F4EA',
    colors: {
        ...DefaultLightTheme.colors,
    },
};

export const darkTheme = {
    ...DefaultDarkTheme,
    calendarDateIndicatorColor: '#1E3A2F',
    backgroundGradientColor: ['#1f2b33', '#3a4661'],
    colors: {
      ...DefaultDarkTheme.colors,
    },
};
