import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';

const VistaZorro = ({navigation}) => {
  const handleCrearMulta = () => {
    // Navigate to the screen for creating a new ticket
    // Replace 'CrearMultaScreen' with the actual screen name
    navigation.navigate('CrearMultaScreen', navigation);
  };

  const handleHistorialMultas = () => {
    // Navigate to the screen for viewing ticket history
    // Replace 'HistorialMultasScreen' with the actual screen name
    navigation.navigate('HistorialMultasScreen');
  };

  const handleCerrarSesion = () => {
    // Log out the user and navigate to the login screen
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{global.loggedUser.user.name}</Text>

      <Button mode="contained" onPress={handleCrearMulta} style={styles.button}>
        Crear nueva multa
      </Button>

      <Button
        mode="contained"
        onPress={handleHistorialMultas}
        style={styles.button}>
        Historial multas
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
    backgroundColor: '#00AF5A',
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

export default VistaZorro;
