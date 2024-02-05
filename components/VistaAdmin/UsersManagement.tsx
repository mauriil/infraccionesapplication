/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Button, Card, Paragraph, TextInput, Title} from 'react-native-paper';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const UsersManagement: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    tipo: '',
  });
  const [showAddUserFields, setShowAddUserFields] = useState(false);

  const getUsers = async () => {
    setUsers([
      {name: 'User 1', email: 'asd@asd.com', tipo: 'admin'},
      {name: 'User 2', email: 'asds@asd.com', tipo: 'admin'},
      {name: 'User 3', email: 'asss@ss.com', tipo: 'admin'},
    ]);
    // try {
    //   const response = await axios.get('/api/users'); // Replace with your backend API endpoint
    //   setUsers(response.data);
    // } catch (error) {
    //   console.error('Error fetching users:', error);
    // }
  };

  const addUser = async () => {
    try {
      await axios.post('/api/users', newUser); // Replace with your backend API endpoint
      setNewUser({name: '', email: '', password: '', tipo: ''});
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
          />
          <TextInput
            label="Email"
            value={newUser.email}
            onChangeText={value => setNewUser({...newUser, email: value})}
            style={styles.input}
          />
          <TextInput
            label="Contraseña"
            secureTextEntry
            value={newUser.password}
            onChangeText={value => setNewUser({...newUser, password: value})}
            style={styles.input}
          />
          <TextInput
            label="Tipo"
            value={newUser.tipo}
            onChangeText={value => setNewUser({...newUser, tipo: value})}
            style={styles.input}
          />
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
    backgroundColor: '#FAD201',
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
});

export default UsersManagement;
