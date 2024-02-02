import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/Login/LoginScreen';
import VistaZorro from './components/VistaZorro/Inicio';
import CrearMultaScreen from './components/VistaZorro/CrearMultaScreen';
import HistorialMultasScreen from './components/VistaZorro/HistorialMultas';
import DetalleMultaScreen from './components/VistaZorro/MultaDetalle';
import {Provider as PaperProvider} from 'react-native-paper';
import CustomTheme from './styles';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={CustomTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="VistaZorro" component={VistaZorro} />
          <Stack.Screen
            name="HistorialMultasScreen"
            component={HistorialMultasScreen}
            options={{
              title: 'Historial Multas',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="DetalleMultaScreen"
            component={DetalleMultaScreen}
            options={{
              title: 'Historial Multas',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="CrearMultaScreen"
            component={CrearMultaScreen}
            options={{
              title: 'Crear Multa',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          {/* <Stack.Screen name="HistorialMultasScreen" component={HistorialMultasScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
