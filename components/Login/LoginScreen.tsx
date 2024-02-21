import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../api/login';
import {useAsyncStorage} from '@react-native-community/async-storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {

    const loginResponse = await login(username, password);

    if (loginResponse) {
      setUsername('');
      setPassword('');

      checkView(loginResponse.user.tipo);
    } else {
      console.log('Invalid credentials');
    }
  };

  const checkView = async (tipo) => {
    switch (tipo) {
      case 'Inspector':
        navigation.navigate('VistaZorro');
        break;
      case 'Corralon':
        navigation.navigate('VistaCorralon');
        break;
      case 'Juez':
        navigation.navigate('VistaJuez');
        break;
      case 'Administrador':
        navigation.navigate('VistaAdmin');
        break;
      default:
        console.log('Invalid user type');
    }
  };

  const checkLogin = async () => {
    const {getItem} = useAsyncStorage('loggedUser');
    const loggedUser = await getItem();

    if (loggedUser) {
      global.loggedUser = JSON.parse(loggedUser);
      checkView(global.loggedUser.user.tipo);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />

      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
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
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});

export default LoginScreen;
