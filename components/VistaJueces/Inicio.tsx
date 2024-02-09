import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';

const VistaJuez = ({navigation}) => {
  const handleCrearMulta = () => {
    // Navigate to the screen for creating a new ticket
    // Replace 'CrearMultaScreen' with the actual screen name
    navigation.navigate('CrearMultaScreen');
  };

  const handleHistorialMultas = () => {
    // Navigate to the screen for viewing ticket history
    // Replace 'HistorialMultasScreen' with the actual screen name
    navigation.navigate('VerMultaParaJuezScreen');
  };

  const handleAdminInfracciones = () => {
    // Navigate to the screen for viewing ticket history
    // Replace 'HistorialMultasScreen' with the actual screen name
    navigation.navigate('AdminInfraccionesParaJuezScreen');
  };

  const handleAdminUnidadFija = () => {
    // Navigate to the screen for viewing ticket history
    // Replace 'HistorialMultasScreen' with the actual screen name
    navigation.navigate('AdminUnidadFijaParaJuezScreen');
  };

  const handleCerrarSesion = () => {
    // Log out the user and navigate to the login screen
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Vista Zorro</Text> */}

      <Button
        mode="contained"
        onPress={handleHistorialMultas}
        style={styles.button}>
        Ver multas
      </Button>

      <Button mode="contained" onPress={handleAdminInfracciones} style={styles.button}>
        Administrar nomencladores
      </Button>

      <Button mode="contained" onPress={handleAdminUnidadFija} style={styles.button}>
        Valor de unidad fija
      </Button>

      <Button
        mode="contained"
        onPress={handleCerrarSesion}
        style={styles.button}>
        Cerrar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 0,
    backgroundColor: '#FAD201',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default VistaJuez;
