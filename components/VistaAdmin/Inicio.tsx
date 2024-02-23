import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';

const VistaAdmin = ({navigation}) => {
  const handleABMUsuarios = () => {
    navigation.navigate('ABMUsuarios');
  };
  const handleABMTransportes = () => {
    navigation.navigate('ABMTransportes');
  };
  const handleABMTaxis = () => {
    navigation.navigate('ABMTaxis');
  };

  const handleCerrarSesion = () => {
    navigation.navigate('LoginScreen');
  };

  const handleABMTurismo = () => {
    navigation.navigate('ABMTurismo');
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
        onPress={handleABMUsuarios}
        style={styles.button}>
        Usuarios
      </Button>

      <Button
        mode="contained"
        onPress={handleABMTransportes}
        style={styles.button}>
        Transportes
      </Button>

      <Button mode="contained" onPress={handleABMTaxis} style={styles.button}>
        Taxis y Remises
      </Button>

      <Button mode="contained" onPress={handleABMTurismo} style={styles.button}>
        Turismo
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

export default VistaAdmin;
