/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, ToastAndroid} from 'react-native';
import {Button, Card, Paragraph, TextInput, Title} from 'react-native-paper';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {getAllUsers, newUserRequest} from '../../api/usuarios';
import {Picker} from '@react-native-picker/picker';

const UsersManagement: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const randomId = Math.floor(Math.random() * 1000);
  const [newUser, setNewUser] = useState({
    name: '',
    email: `user@${randomId}.com`,
    username: '',
    password: '',
    tipo: '',
    nombre_hotel: '',
  });
  const [showAddUserFields, setShowAddUserFields] = useState(false);
  const tiposUsuario = [
    'Administrador',
    'Juez',
    'Corralón',
    'Inspector',
    'Turismo',
  ];

  const setTipoUser = (itemValue: string) => {
    setNewUser({...newUser, tipo: itemValue});
  };

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      await newUserRequest(newUser);
      ToastAndroid.showWithGravity(
        'Usuario creado',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setNewUser({name: '', username: '', password: ''});
      getUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`); // Replace with your backend API endpoint
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePress = (user: any) => {
    navigation.navigate('UserDetalle', {user});
  };

  useEffect(() => {
    getUsers();
  }, []); // Fetch users on component mount

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <Button onPress={() => setShowAddUserFields(!showAddUserFields)}>
        {showAddUserFields ? 'Cancelar' : 'Añadir Usuario'}
      </Button>

      {/* Add User Form (conditionally rendered based on showAddUserFields state) */}
      {showAddUserFields && (
        <View>
          <TextInput
            label="Nombre"
            value={newUser.name}
            onChangeText={value => setNewUser({...newUser, name: value})}
            style={styles.input}
            error={newUser.name.length < 4}
          />
          <TextInput
            label="Usuario"
            value={newUser.username}
            onChangeText={value => setNewUser({...newUser, username: value})}
            style={styles.input}
            error={newUser.username.length < 4}
          />
          <TextInput
            label="Contraseña"
            secureTextEntry
            value={newUser.password}
            onChangeText={value => setNewUser({...newUser, password: value})}
            style={styles.input}
            error={newUser.password.length < 4}
          />
          <Text style={styles.label}>Tipo</Text>
          <Picker
            selectedValue={newUser.tipo}
            onValueChange={itemValue => setTipoUser(itemValue)}
            style={styles.picker}>
            {tiposUsuario.map((tipo, index) => (
              <Picker.Item key={index} label={tipo} value={tipo} />
            ))}
          </Picker>
          {newUser.tipo === 'Turismo' && (
            <TextInput
              label="Nombre del hotel"
              value={newUser.nombre_hotel}
              onChangeText={value =>
                setNewUser({...newUser, nombre_hotel: value})
              }
              style={styles.input}
            />
          )}
          <Button mode="contained" onPress={() => addUser()}>
            Guardar
          </Button>
        </View>
      )}

      <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />

      {/* User List */}
      <View
        style={{
          marginTop: 16,
        }}>
        <FlatList
          data={users}
          keyExtractor={user => user._id}
          renderItem={({item: user}) => (
            <TouchableOpacity onPress={() => handlePress(user)}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{user.name}</Title>
                  <Paragraph>
                    {user.email} - {user.tipo}
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
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
  card: {
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  picker: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default UsersManagement;
