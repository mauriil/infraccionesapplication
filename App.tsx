import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Login/LoginScreen';
import VistaZorro from './components/VistaZorro/Inicio';
import CrearMultaScreen from './components/VistaZorro/CrearMultaScreen';
import HistorialMultasScreen from './components/VistaZorro/HistorialMultas';
import DetalleMultaScreen from './components/VistaZorro/MultaDetalle';
import VistaCorralon from './components/VistaCorralon/Inicio';
import HistorialActasScreen from './components/VistaCorralon/HistorialActas';
import DetalleActaScreen from './components/VistaCorralon/ActaDetalle';
import CrearActaScreen from './components/VistaCorralon/CrearActa';
import VistaJuez from './components/VistaJueces/Inicio';
import { Provider as PaperProvider } from 'react-native-paper';
import CustomTheme from './styles';
import DetalleMultaParaJuezScreen from './components/VistaJueces/DetalleMultaParaJuezScreen';
import VistaAdmin from './components/VistaAdmin/Inicio';
import UsersManagement from './components/VistaAdmin/UsersManagement';
import UserDetalle from './components/VistaAdmin/UserDetalle';
import TransporteManagement from './components/VistaAdmin/TransporteManagement';
import TransporteDetalle from './components/VistaAdmin/TransporteDetalle';
import TaxiManagement from './components/VistaAdmin/TaxiManagement';
import TaxiDetalle from './components/VistaAdmin/TaxiDetalle';
import TaxiEdit from './components/VistaAdmin/TaxiEdit';
import TurismoManagement from './components/VistaAdmin/TurismoManagement';
import TurismoDetalle from './components/VistaAdmin/TurismoDetalle';
import ListarMultasVistaJuez from './components/VistaJueces/ListarMultas';
import InfraccionesManagement from './components/VistaJueces/InfraccionManagement';
import UnidadFija from './components/VistaJueces/UnidadFija';

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


          <Stack.Screen name="VistaCorralon" component={VistaCorralon} />
          <Stack.Screen
            name="HistorialActasScreen"
            component={HistorialActasScreen}
            options={{
              title: 'Historial Actas',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="DetalleActaScreen"
            component={DetalleActaScreen}
            options={{
              title: 'Historial Actas',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="CrearActaScreen"
            component={CrearActaScreen}
            options={{
              title: 'Crear Acta',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />


          <Stack.Screen name="VistaJuez" component={VistaJuez} />
          <Stack.Screen
            name="VerMultaParaJuezScreen"
            component={ListarMultasVistaJuez}
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
            name="DetalleMultaParaJuezScreen"
            component={DetalleMultaParaJuezScreen}
            options={{
              title: 'Detalles de la Multa',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="AdminInfraccionesParaJuezScreen"
            component={InfraccionesManagement}
            options={{
              title: 'Administrar nomencladores',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="AdminUnidadFijaParaJuezScreen"
            component={UnidadFija}
            options={{
              title: 'Administrar nomencladores',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />


          <Stack.Screen name="VistaAdmin" component={VistaAdmin} />
          <Stack.Screen
            name="ABMUsuarios"
            component={UsersManagement}
            options={{
              title: 'Usuarios',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="UserDetalle"
            component={UserDetalle}
            options={{
              title: 'Detalle de usuario',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />

          <Stack.Screen
            name="ABMTransportes"
            component={TransporteManagement}
            options={{
              title: 'Transportes',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="transporteDetalle"
            component={TransporteDetalle}
            options={{
              title: 'Detalle de transporte',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />

          <Stack.Screen
            name="ABMTaxis"
            component={TaxiManagement}
            options={{
              title: 'Taxis y Remises',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="taxiRemisDetalle"
            component={TaxiDetalle}
            options={{
              title: 'Detalle',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="taxiRemisEdit"
            component={TaxiEdit}
            options={{
              title: 'Edición de datos',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />

          <Stack.Screen
            name="ABMTurismo"
            component={TurismoManagement}
            options={{
              title: 'Turismo',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="turismoDetalle"
            component={TurismoDetalle}
            options={{
              title: 'Detalle',
              headerShown: true,
              headerStyle: {
                backgroundColor: CustomTheme.colors.primary,
              },
              headerTintColor: CustomTheme.colors.text,
              animationEnabled: true,
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
