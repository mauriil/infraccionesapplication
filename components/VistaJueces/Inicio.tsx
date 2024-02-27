import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
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

  const handleABMUsuarios = () => {
    navigation.navigate('ABMUsuarios');
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/splash.png')}
        style={{
          width: '100%',
          alignSelf: 'center',
          borderRadius: 60,
        }}
      />

      <Text style={styles.title}>{global.loggedUser.user.name}</Text>

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
        onPress={handleABMUsuarios}
        style={styles.button}>
        Usuarios
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
    backgroundColor: '#FFFAF9',
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
