import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/Login/LoginScreen';
import VistaZorro from './components/VistaZorro/Inicio';
import CrearMultaScreen from './components/VistaZorro/CrearMultaScreen';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="VistaZorro" component={VistaZorro} />
          <Stack.Screen name="CrearMultaScreen" component={CrearMultaScreen} />
          {/* <Stack.Screen name="HistorialMultasScreen" component={HistorialMultasScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
