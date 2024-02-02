import React from 'react';
import {View, StyleSheet} from 'react-native';
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
      {/* <Text style={styles.title}>Vista Zorro</Text> */}

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

export default VistaCorralon;
