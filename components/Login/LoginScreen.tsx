/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Linking, Alert} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {login} from '../../api/login';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {checkVersion} from '../../api/versions';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [newVersion, setNewVersion] = useState(false);
  const [loading, setLoading] = useState(false);

  const VERSION = 9;

  const handleLogin = async () => {
    setLoading(true);
    const loginResponse = await login(username, password);

    if (loginResponse) {
      setUsername('');
      setPassword('');

      checkView(loginResponse.user.tipo);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
      setLoading(false);
    }
  };

  const checkView = async tipo => {
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
    checkNewVersion();
    const {getItem} = useAsyncStorage('loggedUser');
    const loggedUser = await getItem();
    console.log('🚀 ~ checkLogin ~ loggedUser:', loggedUser);

    if (loggedUser) {
      global.loggedUser = JSON.parse(loggedUser);
      checkView(global.loggedUser.user.tipo);
    }

    setTimeout(() => {
      setCheckingLogin(false);
    }, 2000);
  };

  const checkNewVersion = async () => {
    const newVersionResponse = await checkVersion();

    if (newVersionResponse) {
      if (newVersionResponse.number > VERSION) {
        console.log('New version available');
        setNewVersion(newVersionResponse);
        const {removeItem} = useAsyncStorage('loggedUser');
        await removeItem();
        Linking.openURL(newVersionResponse.uri).catch(err =>
          console.error('An error occurred', err),
        );
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (checkingLogin) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/splash.png')}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 60,
          }}
        />
      </View>
    );
  }

  {
    newVersion && <WebView source={{uri: newVersion.uri}} style={{flex: 1}} />;
  }

  return (
    <View style={styles.container}>
      {loading && (
        <Spinner
          visible={loading}
          textContent="Cargando"
          textStyle={{
            color: 'white',
          }}
        />
      )}
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />

      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>

      <Text
        style={{
          color: 'gray',
          position: 'absolute',
          bottom: 0,
          marginBottom: 16,
          alignSelf: 'center',
        }}>
        Version {VERSION}
      </Text>
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
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});

export default LoginScreen;
