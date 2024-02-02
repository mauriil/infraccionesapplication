import {DefaultTheme} from 'react-native-paper';

const CustomTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1e1e1e',
    accent: 'red',
    background: 'red',
    text: 'white',
    placeholder: 'white',
  },
};

export default CustomTheme;
