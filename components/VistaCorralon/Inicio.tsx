import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';

const VistaCorralon = ({navigation}) => {
  const handleCrear = () => {
    navigation.navigate('CrearActaScreen');
  };

  const handleHistorial = () => {
    navigation.navigate('HistorialActasScreen');
  };

  const handleCerrarSesion = () => {
    navigation.navigate('LoginScreen');
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

      <Button mode="contained" onPress={handleCrear} style={styles.button}>
        Crear nueva acta de recepción
      </Button>

      <Button mode="contained" onPress={handleHistorial} style={styles.button}>
        Historial de actas
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

export default VistaCorralon;
