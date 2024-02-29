import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ToastAndroid, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { deleteUser, editUserData } from '../../api/usuarios';
import Spinner from 'react-native-loading-spinner-overlay';

const EditedUserDetalle = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { user } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [editedUser, seteditedUser] = useState(user);

  const setTipoUser = (itemValue: string) => {
    seteditedUser({ ...editedUser, tipo: itemValue });
  };

  const tiposUsuario = [
    'Administrador',
    'Juez',
    'Corralón',
    'Inspector',
    'Turismo',
  ];

  const editeditedUser = () => {
    navigation.navigate('editedUserEdit', { editedUser });
  };

  const editUserDataRequest = async () => {
    try {
      setLoading(true);
      if (editedUser.password === '') {
        delete editedUser.password;
      }
      await editUserData(editedUser);
      ToastAndroid.showWithGravity(
        'Usuario editado',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      navigation.navigate('ABMUsuarios');
      setLoading(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const deleteUserRequestConfirmed = async () => {
    try {
      setLoading(true);
      await deleteUser(editedUser.id);
      ToastAndroid.showWithGravity(
        'Usuario eliminado',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      navigation.navigate('ABMUsuarios');
      setLoading(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteUserRequest = async () => {
    Alert.alert(
      'Eliminar usuario',
      '¿Estás seguro que deseas eliminar este usuario?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => deleteUserRequestConfirmed(),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>

      {loading && (
        <Spinner
          visible={loading}
          textContent="Cargando"
          textStyle={{
            color: 'white',
          }}
        />
      )}

      <View>
        <TextInput
          label="Nombre"
          value={editedUser.name}
          onChangeText={value => seteditedUser({ ...editedUser, name: value })}
          style={styles.input}
          error={editedUser.name.length < 4}
        />
        <TextInput
          label="Usuario"
          value={editedUser.name}
          onChangeText={value => seteditedUser({ ...editedUser, name: value })}
          style={styles.input}
          error={editedUser.name.length < 4}
        />
        <TextInput
          label="Nueva contraseña"
          secureTextEntry
          value=""
          onChangeText={value =>
            seteditedUser({ ...editedUser, password: value })
          }
          style={styles.input}
          error={editedUser.password.length < 4}
        />
        <Text style={styles.label}>Tipo</Text>
        <Picker
          selectedValue={editedUser.tipo}
          onValueChange={itemValue => setTipoUser(itemValue)}
          style={styles.picker}>
          {tiposUsuario.map((tipo, index) => (
            <Picker.Item key={index} label={tipo} value={tipo} />
          ))}
        </Picker>
        {editedUser.tipo === 'Turismo' && (
          <TextInput
            label="Nombre del hotel"
            value={editedUser.nombre_hotel}
            onChangeText={value =>
              seteditedUser({ ...editedUser, nombre_hotel: value })
            }
            style={styles.input}
          />
        )}
      </View>

      <Button
        mode="contained"
        onPress={() => editUserDataRequest()}
        style={{
          marginBottom: 15,
          marginTop: 15,
        }}>
        Guardar
      </Button>

      <Button
        mode="contained"
        onPress={() => deleteUserRequest()}
        style={{
          marginBottom: 15,
          marginTop: 15,
          // some red color not too bright less than #ff0000
          backgroundColor: '#ED4545',
        }}>
        Eliminar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAF9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    marginBottom: 15,
  },
  picker: {
    marginBottom: 15,
  },
});

export default EditedUserDetalle;
